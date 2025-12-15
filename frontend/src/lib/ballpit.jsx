import { useEffect, useRef } from "react"
import {
  AmbientLight,
  Color,
  InstancedMesh,
  MathUtils,
  MeshPhysicalMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PMREMGenerator,
  PointLight,
  Raycaster,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  ACESFilmicToneMapping,
  Clock
} from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

// --- Physics helper -------------------------------------------------------
class Physics {
  constructor(config) {
    this.config = config
    this.positions = new Float32Array(3 * config.count).fill(0)
    this.velocities = new Float32Array(3 * config.count).fill(0)
    this.sizes = new Float32Array(config.count).fill(1)
    this.center = new Vector3()
    this._initPositions()
    this._initSizes()
  }

  _initPositions() {
    const { config, positions } = this
    this.center.toArray(positions, 0)
    for (let i = 1; i < config.count; i++) {
      const idx = 3 * i
      positions[idx] = MathUtils.randFloatSpread(2 * config.maxX)
      positions[idx + 1] = MathUtils.randFloatSpread(2 * config.maxY)
      positions[idx + 2] = MathUtils.randFloatSpread(2 * config.maxZ)
    }
  }

  _initSizes() {
    const { config, sizes } = this
    sizes[0] = config.size0
    for (let i = 1; i < config.count; i++) {
      sizes[i] = MathUtils.randFloat(config.minSize, config.maxSize)
    }
  }

  update(delta) {
    const { config, positions, velocities, sizes, center } = this
    let start = config.controlSphere0 ? 1 : 0
    if (config.controlSphere0) {
      const p0 = new Vector3().fromArray(positions, 0)
      p0.lerp(center, 0.1).toArray(positions, 0)
      new Vector3(0, 0, 0).toArray(velocities, 0)
    }

    for (let i = start; i < config.count; i++) {
      const base = 3 * i
      const pos = new Vector3().fromArray(positions, base)
      const vel = new Vector3().fromArray(velocities, base)
      vel.y -= delta * config.gravity * sizes[i]
      vel.multiplyScalar(config.friction)
      vel.clampLength(0, config.maxVelocity)
      pos.add(vel)
      pos.toArray(positions, base)
      vel.toArray(velocities, base)
    }

    // collisions + bounds
    for (let i = start; i < config.count; i++) {
      const base = 3 * i
      const pos = new Vector3().fromArray(positions, base)
      const vel = new Vector3().fromArray(velocities, base)
      const r = sizes[i]

      for (let j = i + 1; j < config.count; j++) {
        const oBase = 3 * j
        const oPos = new Vector3().fromArray(positions, oBase)
        const oVel = new Vector3().fromArray(velocities, oBase)
        const diff = new Vector3().copy(oPos).sub(pos)
        const dist = diff.length()
        const sum = r + sizes[j]
        if (dist < sum) {
          const overlap = sum - dist
          const corr = diff.normalize().multiplyScalar(0.5 * overlap)
          pos.sub(corr)
          oPos.add(corr)
          vel.sub(corr.clone().multiplyScalar(Math.max(vel.length(), 1)))
          oVel.add(corr.clone().multiplyScalar(Math.max(oVel.length(), 1)))
          pos.toArray(positions, base)
          oPos.toArray(positions, oBase)
          vel.toArray(velocities, base)
          oVel.toArray(velocities, oBase)
        }
      }

      if (config.controlSphere0) {
        const diff0 = new Vector3().fromArray(positions, 0).sub(pos)
        const d0 = diff0.length()
        const sum0 = r + sizes[0]
        if (d0 < sum0) {
          const corr0 = diff0.normalize().multiplyScalar(sum0 - d0)
          vel.sub(corr0.clone().multiplyScalar(Math.max(vel.length(), 2)))
          pos.sub(corr0)
        }
      }

      if (Math.abs(pos.x) + r > config.maxX) {
        pos.x = Math.sign(pos.x) * (config.maxX - r)
        vel.x = -vel.x * config.wallBounce
      }
      if (config.gravity === 0) {
        if (Math.abs(pos.y) + r > config.maxY) {
          pos.y = Math.sign(pos.y) * (config.maxY - r)
          vel.y = -vel.y * config.wallBounce
        }
      } else if (pos.y - r < -config.maxY) {
        pos.y = -config.maxY + r
        vel.y = -vel.y * config.wallBounce
      }
      const maxBoundary = Math.max(config.maxZ, config.maxSize)
      if (Math.abs(pos.z) + r > maxBoundary) {
        pos.z = Math.sign(pos.z) * (config.maxZ - r)
        vel.z = -vel.z * config.wallBounce
      }

      pos.toArray(positions, base)
      vel.toArray(velocities, base)
    }
  }
}

// --- Instanced mesh of spheres -------------------------------------------
class BallInstances extends InstancedMesh {
  constructor(renderer, params = {}) {
    const defaults = {
      count: 220,
      colors: [0x7c5dff, 0xffd166, 0x0ff0fc],
      ambientColor: 0xffffff,
      ambientIntensity: 1,
      lightIntensity: 200,
      materialParams: {
        metalness: 0.5,
        roughness: 0.4,
        clearcoat: 1,
        clearcoatRoughness: 0.15
      },
      minSize: 0.5,
      maxSize: 1.2,
      size0: 1.4,
      gravity: 0.6,
      friction: 0.9975,
      wallBounce: 0.95,
      maxVelocity: 0.25,
      maxX: 5,
      maxY: 5,
      maxZ: 2.5,
      controlSphere0: false,
      followCursor: true
    }
    const config = { ...defaults, ...params }

    const env = new RoomEnvironment()
    const pmrem = new PMREMGenerator(renderer)
    const envMap = pmrem.fromScene(env).texture
    const geometry = new SphereGeometry()
    const material = new MeshPhysicalMaterial({ envMap, ...config.materialParams })
    material.envMapRotation.x = -Math.PI / 2

    super(geometry, material, config.count)

    this.config = config
    this.physics = new Physics(config)
    this.ambientLight = new AmbientLight(config.ambientColor, config.ambientIntensity)
    this.pointLight = new PointLight(config.colors[0], config.lightIntensity)
    this.add(this.ambientLight)
    this.add(this.pointLight)

    this._setColors(config.colors)
  }

  _setColors(colors) {
    if (!Array.isArray(colors) || colors.length < 2) return
    const colorObjs = colors.map(c => new Color(c))
    const lerpColor = (t, out = new Color()) => {
      const clamped = Math.max(0, Math.min(1, t))
      const scaled = clamped * (colorObjs.length - 1)
      const idx = Math.floor(scaled)
      const start = colorObjs[idx]
      if (idx >= colorObjs.length - 1) return start.clone()
      const alpha = scaled - idx
      const end = colorObjs[idx + 1]
      out.r = start.r + alpha * (end.r - start.r)
      out.g = start.g + alpha * (end.g - start.g)
      out.b = start.b + alpha * (end.b - start.b)
      return out
    }

    for (let i = 0; i < this.count; i++) {
      this.setColorAt(i, lerpColor(i / this.count))
      if (i === 0) this.pointLight.color.copy(lerpColor(0))
    }
    if (this.instanceColor) this.instanceColor.needsUpdate = true
  }

  update(delta) {
    this.physics.update(delta)
    const scratch = new Object3D()
    for (let i = 0; i < this.count; i++) {
      scratch.position.fromArray(this.physics.positions, 3 * i)
      scratch.scale.setScalar(i === 0 && this.config.followCursor === false ? 0 : this.physics.sizes[i])
      scratch.updateMatrix()
      this.setMatrixAt(i, scratch.matrix)
      if (i === 0) this.pointLight.position.copy(scratch.position)
    }
    this.instanceMatrix.needsUpdate = true
  }
}

// --- Main factory ---------------------------------------------------------
function createBallpit(canvas, config = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" })
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping

  const camera = new PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.set(0, 0, 20)

  const scene = new Scene()
  const balls = new BallInstances(renderer, config)
  scene.add(balls)

  const raycaster = new Raycaster()
  const plane = new Plane(new Vector3(0, 0, 1), 0)
  const hit = new Vector3()
  const pointer = new Vector2()
  let playing = true

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas
    if (w === 0 || h === 0) return
    renderer.setSize(w, h, false)
    const aspect = w / h
    camera.aspect = aspect
    if (aspect > 1.5) {
      const fov = (2 * Math.atan(Math.tan(Math.PI * camera.fov / 360) / (aspect / 1.5))) * 180 / Math.PI
      camera.fov = fov
    } else {
      camera.fov = 50
    }
    camera.updateProjectionMatrix()
    const dist = camera.position.length()
    const fovRad = camera.fov * Math.PI / 180
    const viewHeight = 2 * Math.tan(fovRad / 2) * dist
    const viewWidth = viewHeight * camera.aspect
    balls.config.maxX = viewWidth / 2
    balls.config.maxY = viewHeight / 2
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1))
  }

  const onMove = (x, y) => {
    pointer.set((x / canvas.clientWidth) * 2 - 1, -(y / canvas.clientHeight) * 2 + 1)
    raycaster.setFromCamera(pointer, camera)
    camera.getWorldDirection(plane.normal)
    raycaster.ray.intersectPlane(plane, hit)
    balls.physics.center.copy(hit)
    balls.config.controlSphere0 = true
  }

  const onLeave = () => {
    balls.config.controlSphere0 = false
  }

  const handlePointerMove = (e) => onMove(e.clientX, e.clientY)
  const handleTouchMove = (e) => {
    if (e.touches?.length > 0) {
      e.preventDefault()
      onMove(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  const clock = new Clock()
  let raf
  const animate = () => {
    const dt = clock.getDelta()
    if (playing) balls.update(dt)
    renderer.render(scene, camera)
    raf = requestAnimationFrame(animate)
  }

  resize()
  animate()

  const cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener("resize", resize)
    canvas.removeEventListener("pointermove", handlePointerMove)
    canvas.removeEventListener("pointerleave", onLeave)
    canvas.removeEventListener("touchmove", handleTouchMove)
    canvas.removeEventListener("touchend", onLeave)
    balls.dispose?.()
    renderer.dispose()
  }

  window.addEventListener("resize", resize)
  canvas.addEventListener("pointermove", handlePointerMove)
  canvas.addEventListener("pointerleave", onLeave)
  canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
  canvas.addEventListener("touchend", onLeave)

  return { cleanup, togglePause: () => (playing = !playing) }
}

export function BallpitCanvas({ className = "" }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const instance = createBallpit(canvas)
    return () => instance.cleanup()
  }, [])

  return <canvas ref={ref} className={className} />
}

export default BallpitCanvas

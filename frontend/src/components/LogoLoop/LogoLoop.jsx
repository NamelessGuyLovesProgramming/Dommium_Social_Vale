import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo
} from 'react'
import './LogoLoop.css'

// Original animation config from reactbits LogoLoop
const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 }

const toCssLength = (value) => (typeof value === 'number' ? `${value}px` : value ?? undefined)
const cx = (...parts) => parts.filter(Boolean).join(' ')

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback()
      window.addEventListener('resize', handleResize)
      callback()
      return () => window.removeEventListener('resize', handleResize)
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null
      const observer = new ResizeObserver(callback)
      observer.observe(ref.current)
      return observer
    })

    callback()
    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [callback, elements, dependencies])
}

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? []
    if (images.length === 0) {
      onLoad()
      return
    }

    let remainingImages = images.length
    const handleImageLoad = () => {
      remainingImages -= 1
      if (remainingImages === 0) {
        onLoad()
      }
    }

    images.forEach((img) => {
      const htmlImg = img
      if (htmlImg.complete) {
        handleImageLoad()
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true })
        htmlImg.addEventListener('error', handleImageLoad, { once: true })
      }
    })

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad)
        img.removeEventListener('error', handleImageLoad)
      })
    }
  }, [onLoad, seqRef, dependencies])
}

const useAnimationLoop = (
  trackRef,
  baseVelocity,
  directionSign,
  seqWidth,
  seqHeight,
  isHovered,
  hoverSpeed,
  isVertical,
  disabled = false,
  copyCount = 0,
  containerSize = 0
) => {
  const rafRef = useRef(null)
  const lastTimestampRef = useRef(null)
  const offsetRef = useRef(0)
  const prevSeqSizeRef = useRef(null)
  const velocityRef = useRef(0)

  useEffect(() => {
    if (disabled) return
    const track = trackRef.current
    if (!track) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const seqSize = isVertical ? seqHeight : seqWidth

    if (seqSize !== prevSeqSizeRef.current) {
      // for rightward motion: start so that the tail ends exactly at the right edge (no gap on the left)
      if (!isVertical && directionSign === 1) {
        offsetRef.current = Math.max(seqSize - containerSize, 0)
      } else {
        offsetRef.current = 0
      }
      prevSeqSizeRef.current = seqSize
    }

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize
      const transformValue = isVertical
        ? `translate3d(0, ${directionSign * offsetRef.current}px, 0)`
        : `translate3d(${directionSign * offsetRef.current}px, 0, 0)`
      track.style.transform = transformValue
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)'
      return () => {
        lastTimestampRef.current = null
      }
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000
      lastTimestampRef.current = timestamp

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : baseVelocity
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * easingFactor

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize
        offsetRef.current = nextOffset
        const transformValue = isVertical
          ? `translate3d(0, ${directionSign * offsetRef.current}px, 0)`
          : `translate3d(${directionSign * offsetRef.current}px, 0, 0)`
        track.style.transform = transformValue
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastTimestampRef.current = null
    }
  }, [baseVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef, directionSign, disabled])
}

const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = 'left',
    forceJs = false,
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    startOffset = 0,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
  }) => {
    const containerRef = useRef(null)
    const trackRef = useRef(null)
    const seqRef = useRef(null)

    const [seqWidth, setSeqWidth] = useState(0)
    const [seqHeight, setSeqHeight] = useState(0)
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES)
    const [isHovered, setIsHovered] = useState(false)
    const [containerSize, setContainerSize] = useState(0)

    const effectiveHoverSpeed = useMemo(() => {
      const absHover = hoverSpeed !== undefined ? Math.abs(hoverSpeed) : undefined
      if (absHover !== undefined) return absHover
      if (pauseOnHover === true) return 0
      if (pauseOnHover === false) return undefined
      return undefined
    }, [hoverSpeed, pauseOnHover])

    const isVertical = direction === 'up' || direction === 'down'
    // Für horizontale Variante nutzen wir CSS-Marquee (sauberer Spawn von links, Exit nach rechts)
    const useCssMarquee = !isVertical && !forceJs

    const directionSign = useMemo(() => {
      if (isVertical) {
        return direction === 'down' ? 1 : -1
      }
      return direction === 'right' ? 1 : -1
    }, [direction, isVertical])

    const baseVelocity = useMemo(() => Math.abs(speed), [speed])

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0
      setContainerSize(containerWidth)
      const sequenceRect = seqRef.current?.getBoundingClientRect?.()
      const sequenceWidth = sequenceRect?.width ?? 0
      const sequenceHeight = sequenceRect?.height ?? 0

      if (isVertical) {
        const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0
        if (containerRef.current && parentHeight > 0) {
          const targetHeight = Math.ceil(parentHeight)
          if (containerRef.current.style.height !== `${targetHeight}px`)
            containerRef.current.style.height = `${targetHeight}px`
        }
        if (sequenceHeight > 0) {
          setSeqHeight(Math.ceil(sequenceHeight))
          const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight
          const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded))
        }
      } else if (sequenceWidth > 0) {
        const roundedWidth = Math.ceil(sequenceWidth)
        setSeqWidth(roundedWidth)
        if (!useCssMarquee) {
          const track = trackRef.current
          if (track) track.style.transform = 'translate3d(0, 0, 0)'
        }
        // Stelle sicher, dass die Sequenz mindestens die Containerbreite plus Reserve abdeckt
        if (useCssMarquee) {
          const copiesNeeded = Math.max(
            3, // mindestens 3 Kopien, damit der Viewport immer gefüllt bleibt
            Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM
          )
          setCopyCount(copiesNeeded)
        } else {
          const copiesNeeded = Math.max(
            ANIMATION_CONFIG.MIN_COPIES,
            Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM
          )
          setCopyCount(copiesNeeded)
        }
      }
    }, [isVertical, useCssMarquee])

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical])
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical])

    // CSS-Marquee für horizontale Variante, sonst JS-Loop (vertikal)
    useEffect(() => {
      if (!useCssMarquee) return
      const track = trackRef.current
      if (!track || seqWidth === 0) return
      const durationSeconds = seqWidth / baseVelocity
      track.style.setProperty('--logoloop-duration', `${durationSeconds}s`)
      track.style.setProperty('--logoloop-shift', `${seqWidth}px`)
      track.classList.add('logoloop__track--marquee', direction === 'right' ? 'logoloop__track--marquee-right' : 'logoloop__track--marquee-left')
      return () => {
        track.classList.remove('logoloop__track--marquee', 'logoloop__track--marquee-right', 'logoloop__track--marquee-left')
        track.style.removeProperty('--logoloop-duration')
        track.style.removeProperty('--logoloop-shift')
      }
    }, [useCssMarquee, seqWidth, baseVelocity, direction])

    // Hover-Speed für CSS-Marquee dynamisch anpassen
    useEffect(() => {
      if (!useCssMarquee) return
      const track = trackRef.current
      if (!track || seqWidth === 0) return
      const targetVelocity =
        isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : baseVelocity
      const durationSeconds = seqWidth / Math.max(1, targetVelocity)
      track.style.setProperty('--logoloop-duration', `${durationSeconds}s`)
    }, [useCssMarquee, seqWidth, isHovered, effectiveHoverSpeed, baseVelocity])

    if (!useCssMarquee) {
    useAnimationLoop(
      trackRef,
      baseVelocity,
      directionSign,
      seqWidth,
      seqHeight,
      isHovered,
      effectiveHoverSpeed,
      isVertical,
      useCssMarquee, // disable JS loop when CSS marquee is active
      copyCount,
      containerSize
    )
    }

    const cssVariables = useMemo(
      () => ({
        '--logoloop-gap': `${gap}px`,
        '--logoloop-logoHeight': `${logoHeight}px`,
        ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    )

    const rootClassName = useMemo(
      () =>
        cx(
          'logoloop',
          isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
          fadeOut && 'logoloop--fade',
          scaleOnHover && 'logoloop--scale-hover',
          className
        ),
      [isVertical, fadeOut, scaleOnHover, className]
    )

    const handleMouseEnter = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(true)
    }, [effectiveHoverSpeed])

    const handleMouseLeave = useCallback(() => {
      if (effectiveHoverSpeed !== undefined) setIsHovered(false)
    }, [effectiveHoverSpeed])

    const renderLogoItem = useCallback(
      (item, key) => {
        if (renderItem) {
          return (
            <li className="logoloop__item" key={key} role="listitem">
              {renderItem(item, key)}
            </li>
          )
        }

        const isNodeItem = 'node' in item
        const content = isNodeItem ? (
          <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
            {item.node}
          </span>
        ) : (
          <img
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ''}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )

        const itemAriaLabel = isNodeItem ? item.ariaLabel ?? item.title : item.alt ?? item.title

        const itemContent = item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={itemAriaLabel || 'logo link'}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        )

        return (
          <li className="logoloop__item" key={key} role="listitem">
            {itemContent}
          </li>
        )
      },
      [renderItem]
    )

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="logoloop__list"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
          </ul>
        )),
      [copyCount, logos, renderLogoItem]
    )

    const containerStyle = useMemo(
      () => ({
        width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : toCssLength(width) ?? '100%',
        ...cssVariables,
        ...style
      }),
      [width, cssVariables, style, isVertical]
    )

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
      >
        <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {logoLists}
        </div>
      </div>
    )
  }
)

LogoLoop.displayName = 'LogoLoop'

export default LogoLoop

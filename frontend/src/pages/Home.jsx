const Home = () => {
  return (
    <div className="page" style={{ padding: 0, margin: '-2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0rem',
        paddingTop: '0rem',
        minHeight: '80vh'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            maxWidth: '90%',
            width: '800px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          src="/videos/file_example_MP4_1280_10MG.mp4"
        >
          Dein Browser unterstützt das Video-Tag nicht.
        </video>
      </div>
    </div>
  )
}

export default Home

import { useNavigate } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate()

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        Re<span style={styles.colon}>:</span>주me
      </div>

      <div style={styles.links}>
        <a href="#why" style={styles.link}>왜 필요한가</a>
        <a href="#how" style={styles.link}>작동 방식</a>
        <a href="#pricing" style={styles.link}>가격</a>
      </div>

      <button
        className="btn-main"
        style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}
        onClick={() => navigate('/input')}
      >
        무료로 시작
      </button>
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.1rem 2.5rem',
    background: 'rgba(245,240,232,0.88)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(26,23,20,0.07)',
  },
  logo: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '1.35rem',
    color: 'var(--ink)',
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    userSelect: 'none',
  },
  colon: {
    color: 'var(--accent)',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
  },
  link: {
    fontSize: '0.78rem',
    fontWeight: 400,
    color: 'var(--ink2)',
    textDecoration: 'none',
    letterSpacing: '0.05em',
  },
}

export default Nav

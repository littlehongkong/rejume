function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.logo}>
        Re<span style={styles.colon}>:</span>주me
      </div>
      <p style={styles.copy}>© 2026 Re:주me. All rights reserved.</p>
    </footer>
  )
}

const styles = {
  footer: {
    borderTop: '1px solid rgba(26,23,20,0.1)',
    padding: '2rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
    background: 'var(--bg)',
  },
  logo: {
    fontFamily: "'Libre Baskerville', serif",
    fontSize: '1.1rem',
    color: 'var(--ink2)',
  },
  colon: {
    color: 'var(--accent)',
  },
  copy: {
    fontSize: '0.72rem',
    color: 'var(--ink3)',
  },
}

export default Footer

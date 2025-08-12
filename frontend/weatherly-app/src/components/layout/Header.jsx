import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🌤️</span>
          <h2>Weatherly</h2>
        </div>
        <nav className="nav">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Forecast</a>
          <a href="#" className="nav-link">About</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
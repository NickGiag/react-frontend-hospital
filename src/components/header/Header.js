import '../../styles/header.css';
import logo from '../../logo/logo.svg'

function Header({loggedIn, userName}) {
    return (
        <header className="header">
            <div className="header-logo">
                <a href='http://localhost:3000/'>
                    <img src={logo} alt="Hospital Logo" />
                </a>
            </div>
            <h1>Hospital Management</h1>
            {loggedIn ? (
                <span className="header-user">Hello, {userName}</span>
            ) : (
                <span></span>
            )}
        </header>
    )
}

export default Header
import '../../styles/header.css';

function Header({loggedIn, userName}) {
    return (
        <header className="header">
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
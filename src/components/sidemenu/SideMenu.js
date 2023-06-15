import '../../styles/sideMenu.css'
import { Link } from 'react-router-dom';

function SideMenu({loggedIn}) {
    return (
        <div className="side-menu">
            {loggedIn ? (
                <ul>
                    <li>
                    <Link to="/appointments">Your Appointments</Link>
                    </li>
                    <li>
                    <Link to="/appointments">Make a new Appointment</Link>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                    <li>
                    <Link to="/register">Register form</Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default SideMenu
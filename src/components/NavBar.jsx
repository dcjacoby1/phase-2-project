import { Link } from "react-router-dom"
function NavBar() {
    return(
        <div id="nav-bar">

            <Link to="/" style={{ fontSize: '35px', color: 'white', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Home</Link>

            <Link to="/history" style={{ fontSize: '35px', color: 'white', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>History</Link>

            <Link to="/rules" style={{ fontSize: '35px', color: 'white', textDecoration: 'none', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Rules</Link>

        </div>
    )
}
export default NavBar
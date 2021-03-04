import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({user}) => {
    
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-blue">
            <Link className="navbar-brand" to="/"><img src="logo.svg" height="45px" alt=""/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/appartments">Lejligheder</Link>
                </li>
                {!user && <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>}  
                {user && <li className="nav-item"><span className="nav-link">Hej {user.name}</span></li>}  
                {user && <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>}       
            </ul>
        </div>
        </nav>
    );
    
}
 
export default Navbar;
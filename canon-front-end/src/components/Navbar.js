import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from './AuthContext';
import jwt_decode from 'jwt-decode';
import logo from '../img/canonlogo.png';

function NavBar() {
    const { isLoggedIn, login, logout } = useContext(AuthContext);
  
    const token = sessionStorage.getItem('token');
    const decodedToken = token ? jwt_decode(token) : null;
    const username = decodedToken?.sub;
  
    const links = [
      {
        id: 1,
        path: "/",
        text: "Home"
      },
      {
        id: 2,
        path: "/OverViewPage",
        text: "Overview"
      },
      {
        id: 4,
        path: "/search",
        text: "Search"
      }
    ];
  
    return (
      <nav className="navbar">
        <ul className="navbar-ul">
        <div className="navbar-ul-li-a">
              <img src={logo} alt="Canon Logo" className="navbar-logo" /> 
              </div> 
          <div className="navbar-links">          
              {links.map(link => (
              <li key={link.id}>
                <NavLink className="navbar-ul-li-a" to={link.path}>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </div>

          <div className="navbar-auth">
            {isLoggedIn ? (
              <>
                <div className="navbar-ul-li-a">{`Welcome ${username}`}</div>
                <button className="navbar-ul-li-button" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink className="navbar-ul-li-a" to="/logInPage">
                Log in
              </NavLink>
            )}
          </div>
        </ul>
      </nav>
    );
  }

  export default NavBar;
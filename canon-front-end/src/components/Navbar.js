import React from "react"
import "./Navbar.css"
import { NavLink } from "react-router-dom"

function NavBar() {

    const links = [
        {
            id: 1,
            path: "/",
            text: "Home"
        },
        {
            id: 2,
            path: "/testdetailspage",
            text: "Test details"
        }
    ]

    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                {links.map(link => {
                    return (
                        <li key={link.id}>
                            { <NavLink className="navbar-ul-li-a" to={link.path}> {link.text} </NavLink> }
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavBar;
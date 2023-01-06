import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../../App.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  mb-5 ">
        <div className="container">
        <Link to="/"  className="fs-3  navbar-brand"><img style={{"width": "100px","height": "45px"}} src="Rick_and_Morty.svg" alt="" /></Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <style jsx="true">
                    {`
                        button[aria-expanded="false"] > .close{
                            display: none;
                        }
                        button[aria-expanded="true"] > .open{
                            display: none;
                        }
                    `}
                </style>

                <i className="fa-solid fa-bars open text-white"></i>
                <i className="fa-solid fa-x close text-white"></i>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">

            <div className="navbar-nav fs-5">
                <NavLink to="/episodes"className="nav-link">Episodes</NavLink>
                <NavLink to="/favourite"className="nav-link">Favourite</NavLink>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
import React, { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom'; // Import for routing
import 'bootstrap/dist/css/bootstrap.min.css';
import {useAuth} from "../Auth"

const NavPage = () => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => setShow(!show); // Toggle between open and closed states

  return (
    <>
      {/* Icon to Toggle Offcanvas for small screens */}
      <div className="d-block d-lg-none" style={{ padding: '10px', position: 'absolute', zIndex: '1050' }}>
        {!show && ( // Show the hamburger icon only when the menu is not open
          <FaBars
            onClick={toggleMenu}
            style={{
              fontSize: '24px',
              cursor: 'pointer',
              color: '#007bff',
            }}
          />
        )}
      </div>

      {/* Offcanvas Navigation for small screens */}
      <Offcanvas show={show} onHide={toggleMenu} placement="start">
        <Offcanvas.Header>
          <Offcanvas.Title>Welcome</Offcanvas.Title>
          <FaTimes
            onClick={toggleMenu}
            style={{
              fontSize: '24px',
              position:'relative',
              left:'190',
              cursor: 'pointer',
              color: '#007bff',
            }}
          />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <NavLink to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/Adminpage" className="nav-link" onClick={toggleMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/datas" className="nav-link" onClick={toggleMenu}>
              Datas
            </NavLink>
            <NavLink to="/team" className="nav-link" onClick={toggleMenu}>
              Team
            </NavLink>
            <NavLink to="/chat" className="nav-link" onClick={toggleMenu}>
              Chat
            </NavLink>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Regular Navbar for larger screens */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-none d-lg-block">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            Admin Dashboard
          </Link>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/datas" className="nav-link">
                Datas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/team" className="nav-link">
                Team
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/chat" className="nav-link">
                Chat
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ padding: '20px' }}>
        {/* Page content goes here */}
      </div>
    </>
  );
};

export default NavPage;

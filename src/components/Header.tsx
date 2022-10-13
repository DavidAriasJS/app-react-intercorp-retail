import { FC } from "react";
import { NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header:FC = () => {
    return (
        <div className="d-flex">
            <Navbar bg="dark" variant="dark" className="w-100">
                <Container>
                <Navbar.Brand><b>Intercorp</b></Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to="/" className={({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}>Inicio</NavLink>
                    <NavLink to="/clients" className={({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}>Clientes</NavLink>
                    <NavLink to="/analysis" className={({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}>Analisis</NavLink>
                </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

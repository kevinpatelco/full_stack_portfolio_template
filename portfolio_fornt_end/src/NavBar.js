import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar} from 'react-bootstrap';

class NavBar extends Component{
    render(){
        return(
            <>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                    <Nav className="mr-auto" >
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/projects">Projects</Nav.Link>
                        <Nav.Link href="/resume">Resume</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar>
            </>
        )
    }
}

export default NavBar;
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
     <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Link to={'/'} className='text-white fs-4' style={{textDecoration:"none"}}><i className="fa-solid fa-bars-staggered fa-bounce text-dark pe-2" />List <span className='text-dark'>Bag</span></Link>
          <Nav className="ms-auto">
          <Link to={'/'} className='px-2 text-light' style={{textDecoration:"none"}}>Home</Link>
          <Link to={'/create'} className='text-light' style={{textDecoration:"none"}}>Add</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import styles from './navBarAuth.module.css';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
      <Container>
        <Link passHref href="/notes">
          <Navbar.Brand>Noteworthy</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/notes">
              <Nav.Link className={styles['nav-link-jiggle']}>Notes</Nav.Link>
            </Link>
            <Link passHref href="/Note/new">
              <Nav.Link className={styles['nav-link-jiggle']}>Add Note</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link className={styles['nav-link-jiggle']}>Categories</Nav.Link>
            </Link>
            <Link passHref href="/Category/new">
              <Nav.Link className={styles['nav-link-jiggle']}>Add Category</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

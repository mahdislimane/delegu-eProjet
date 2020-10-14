import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
// import FireTest from "../firetest";
export default function NavBar(props) {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Link to={`/connected/`}>
            <Button>Dashboard</Button>
          </Link>
          <Link to={`/connected/Planning`}>
            <Button>Planning</Button>
          </Link>
          <Link to={`/connected/History`}>
            <Button>History</Button>
          </Link>
        </Nav>
      </Navbar>
      {/* <FireTest /> */}
    </div>
  );
}

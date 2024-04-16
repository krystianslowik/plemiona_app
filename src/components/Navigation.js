import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

const Navigation = ({ onNavigationItemClick, userName, notificationCount }) => {
  const handleItemClick = (item) => {
    onNavigationItemClick(item);
  };

  const handleLogout = () => {
    AuthService.logout();
    // Dodaj kod do przekierowania użytkownika na stronę logowania lub inny widok
    //TODO
  };

  return (
    <Navbar
      variant="dark"
      bg="dark"
      expand="lg"
      className="justify-content-between"
    >
      <Container>
        <Navbar.Brand>
          <Link
            to="/dashboard"
            onClick={() => handleItemClick("main")}
            className="navbar-brand"
          >
            plemiona.app
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse className="justify-content-between" id="navbarNav">
          <Nav className="mr-auto">
            <Link
              className="nav-link position-relative"
              to="/dashboard/reports"
              onClick={() => handleItemClick("reports")}
            >
              Reports{" "}
              <Badge
                bg="secondary"
                className="position-absolute top-0 start-100 translate-middle border border-light rounded-circle bg-danger p-1"
                pill
              >
                {" "}
              </Badge>
            </Link>
            <Link
              className="nav-link"
              to="/dashboard/statistics"
              onClick={() => handleItemClick("statistics")}
            >
              Statistics
            </Link>
            <Link
              className="nav-link"
              to="/dashboard/analytics"
              onClick={() => handleItemClick("analytics")}
            >
              Analytics
            </Link>
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic" className="">
                {userName}
              </Dropdown.Toggle>

              <Dropdown.Menu align="right">
                <Dropdown.Item>Notofications</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

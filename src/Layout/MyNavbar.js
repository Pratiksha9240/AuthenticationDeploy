import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const MyNavbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ReactAuth</Navbar.Brand>
          <Nav className="me-auto">
            {isLoggedIn && <NavLink className="nav-link" to="/Dashboard">
              Dahsboard
            </NavLink>}
            {isLoggedIn && (
              <NavLink className="nav-link" to="/profile">
                Change Password
              </NavLink>
            )}
          </Nav>
          {!isLoggedIn && (
            <>
              <NavLink className="nav-link" to="/login">
                <Button variant="light" style={{ marginRight: "20px" }}>
                  Login
                </Button>
              </NavLink>
              <NavLink className="nav-link" to="/signUp">
                <Button variant="light">SignUp</Button>
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <NavLink className="nav-link" to='/login'>
              <Button variant="light" onClick={authCtx.logout}>
                Logout
              </Button>
            </NavLink>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;

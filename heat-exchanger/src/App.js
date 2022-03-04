import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  return (
    <UserContext.Provider value={{loggedIn:loggedIn, setLoggedIn:setLoggedIn, userId:userId, setUserId:setUserId}}>
      <div style={{ margin: "0px" }}>
        <Navbar bg="light" variant="light" expand="sm">
          <Container>
            <Navbar.Brand>
              <FontAwesomeIcon icon={faCalculator} /> {" "}
              PHE Designer
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"  >
              {loggedIn ?
                <Nav className="ms-auto">
                  <LinkContainer to={`/main/${userId}`}>
                    <Nav.Link>Main</Nav.Link>
                  </LinkContainer>
                  <Nav.Link 
                  href="#"
                  onClick={()=>{
                    setLoggedIn(false);
                    navigate("/login");
                  }}
                  >Logout</Nav.Link>
                  {/* <Nav.Link as={Link} to={`/design/rating?userId=${userId}&designId=new`}>Rating</Nav.Link>
              <Nav.Link as={Link} to={`/design/sizing?userId=${userId}&designId=new`}>Sizing</Nav.Link> */}
                </Nav>
                :
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                  <Nav.Link as={Link} to="/design/rating?designId=demo">Rating Demo</Nav.Link>
                  <Nav.Link as={Link} to="/design/sizing?designId=demo">Sizing Demo</Nav.Link>
                </Nav>

              }

            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet context={[setUserId, setLoggedIn]} />
      </div>
    </UserContext.Provider>

  );
}

export default App;

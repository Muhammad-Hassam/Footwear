import { Container, Row, Col } from "reactstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
const AdminNav = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col xs="12" md="12" sm="12">
          <div>
            <h1 className="logo">FoOtWeaR</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="12" sm="12">
          <Navbar expand="lg fam dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav navbar-light">
              <Nav className="mr-auto">
                <Link to="/" className="nav_padding clr">
                  Home
                </Link>
              </Nav>
              <Nav className="mr-auto">
                <Link to="/AdminDashboard" className="nav_padding clr">
                  Items
                </Link>
              </Nav>
              <Nav className="mr-auto">
                <Link to="/additems" className="nav_padding clr">
                  Add Items
                </Link>
              </Nav>
              <Nav className="mr-auto">
                <Link to="/AdminOrder" className="nav_padding clr">
                  Orders
                </Link>
              </Nav>
              <Nav className="mr-auto">
                <Link to="/AdminMessages" className="nav_padding clr">
                  Messages
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};
export default AdminNav;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link, useHistory } from 'react-router-dom';
import './header.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../config/cartContext';
import { auth, database } from '../../config/firebase';
import Headertop from './headertop';

const Header = (props) => {
  const { carts_array, setcarts_array } = useCart();
  const history = useHistory();
  const [data, setdata] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        database
          .ref('/ecommerce')
          .child('carts/' + auth.currentUser.uid)
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              setcarts_array(Object.values(snapshot.val()));
            } else {
              setcarts_array([]);
            }
          });
        setdata(true);
      } else {
        setcarts_array([]);
        setdata(false);
      }
    });
  }, []);

  const carts = () => {
    if (auth) {
      history.push('/cartitem');
    } else {
      history.push('/login');
    }
  };
  if (data === true) {
    return (
      <>
        <Headertop />
        <Container fluid={true}>
          <Row>
            <Col xs='12' md='12' sm='12'>
              <div>
                <h1 className='logo'>FoOtWeaR</h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='12' sm='12'>
              <Navbar expand='lg fam dark'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav navbar-light'>
                  <Nav className='mr-auto'>
                    <Link to='/' className='nav_padding clr'>
                      Home
                    </Link>
                    <Link to='/about' className='nav_padding clr'>
                      About Us
                    </Link>
                    <Link to='/contact' className='nav_padding clr'>
                      Contact Us
                    </Link>
                  </Nav>
                  <Form inline className='mr-1'>
                    <Button onClick={carts}>
                      <FaShoppingCart />
                      {carts_array.length}
                    </Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='12' sm='12'>
              <p className='sale'>
                25% off (Almost) Everything! Use Code: Summer Sale
              </p>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Headertop />
        <Container fluid={true}>
          <Row>
            <Col xs='12' md='12' sm='12'>
              <div>
                <h1 className='logo'>FoOtWeaR</h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='12' sm='12'>
              <Navbar expand='lg fam dark'>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav navbar-light'>
                  <Nav className='mr-auto'>
                    <Link to='/' className='nav_padding clr'>
                      Home
                    </Link>
                    <Link to='/about' className='nav_padding clr'>
                      About Us
                    </Link>
                    <Link to='/signup' className='nav_padding clr'>
                      Signup
                    </Link>
                    <Link to='/login' className='nav_padding clr'>
                      Login
                    </Link>
                    <Link to='/contact' className='nav_padding clr'>
                      Contact Us
                    </Link>
                  </Nav>
                  <Form inline className='mr-1'>
                    <Button onClick={carts}>
                      <FaShoppingCart />
                      {carts_array.length}
                    </Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='12' sm='12'>
              <p className='sale'>
                25% off (Almost) Everything! Use Code: Summer Sale
              </p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default Header;

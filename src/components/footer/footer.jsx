import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import brand1 from '../../images/brand-1.jpg';
import brand2 from '../../images/brand-2.jpg';
import brand3 from '../../images/brand-3.jpg';
import brand4 from '../../images/brand-4.jpg';
import './footer.css';

const Footer = (props) => {
  return (
    <div>
      <Container fluid={true} className='bg-clr mt-4 fam pb-5'>
        <Row>
          <Col xs='12' sm='12' md='12'>
            <h3 className='text-center  mt-3'>Our Trusted Partners</h3>
          </Col>
        </Row>

        <Container>
          <Row className='mt-1 mb-3 t'>
            <Col xs='12' sm='12' md='3' className='text-center mt-3'>
              <a href='https://www.adidas.com/us' target='blank'>
                <img src={brand1} alt='' className='brand-size ' />
              </a>
            </Col>
            <Col xs='12' sm='12' md='3' className='text-center mt-3'>
              <a href='https://www.nike.com/' target='blank'>
                <img src={brand2} alt='' className='brand-size' />
              </a>
            </Col>
            <Col xs='12' sm='12' md='3' className='text-center mt-3'>
              <a href='https://www.gucci.com/us/en/' target='blank'>
                <img src={brand3} alt='' className='brand-size' />
              </a>
            </Col>
            <Col xs='12' sm='12' md='3' className='text-center mt-3'>
              <a href='https://eu.puma.com/uk/en/home' target='blank'>
                <img src={brand4} alt='' className='brand-size' />
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid={true}>
        <Row>
          <Col sm='12' md='12' xs='12' className=' footer text-center p-3'>
            <p className='text-center'>
              &copy; 2021 footwear. All rights reserved. Theme design by Hassam
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Footer;

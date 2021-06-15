import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import about from '../../images/about.jpg';
import './about.css';

const Abouts = (props) => {
  return (
    <Container>
      <Row className='pt-5 mb-5'>
        <Col xs='12' md='6' sm='12'>
          <img src={about} alt='about' className='about pt-5' />
        </Col>
        <Col xs='12' md='6' sm='12' className='pt-3 pl-3 font-fam'>
          <h2 className='text-center'>
            Footwear the leading eCommerce Store around the Globe
          </h2>
          <p className='text-justify pt-3 font-size'>
            The Big Oxmox advised her not to do so, because there were thousands
            of bad Commas, wild Question Marks and devious Semikoli, but the
            Little Blind Text didn’t listen. She packed her seven versalia, put
            her initial into the belt and made herself on the way.
          </p>
          <p className='text-justify font-size'>
            When she reached the first hills of the Italic Mountains, she had a
            last view back on the skyline of her hometown Bookmarksgrove, the
            headline of Alphabet Village and the subline of her own road, the
            Line Lane. Pityful a rethoric question ran over her cheek, then she
            continued her way.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Abouts;

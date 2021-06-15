import React from 'react';
import './slider.css';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import img_bg_1 from '../../images/bg-1.jpg';
import img_bg_2 from '../../images/bg-2.jpg';
import img_bg_3 from '../../images/bg-3.jpg';
import men from '../../images/men.jpg';
import women from '../../images/women.jpg';
import { useHistory } from 'react-router-dom';

const Slider = () => {
  const history = useHistory();

  const items = [
    {
      src: img_bg_1,
      caption: 'Male Foot-Wears',
      header: 'Best Quality Foot-Wears',
      key: '1',
      className: 'slide',
    },
    {
      src: img_bg_2,
      caption: 'Female Foot-Wears',
      header: 'Best Style Foot-Wears',
      key: '2',
    },
    {
      src: img_bg_3,
      caption: 'Comfortable Prices',
      header: 'Best Price Foot-Wears',
      key: '3',
    },
  ];

  const menWear = () => {
    history.push('/men');
  };
  const womenWear = () => {
    history.push('/women');
  };
  return (
    <div>
      <Container fluid={true}>
        <Row>
          <Col xs='12' md='12' sm='12'>
            <UncontrolledCarousel items={items} className='slider' />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col xs='12' md='12' sm='12'>
            <p className='text-center fontfam slider-btm pt-5 pb-3'>
              It started with a simple idea: Create quality, well-designed
              products that I wanted myself.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs='12' md='6' sm='12'>
            <Card>
              <CardImg top width='100%' src={men} alt='Card image cap' />
              <CardBody className='text-center'>
                <CardTitle className='text-center fontfam shop-font'>
                  Men's Collection Shop
                </CardTitle>
                <Button className='mt-2' onClick={() => menWear()}>
                  Check Here
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs='12' md='6' sm='12'>
            <Card>
              <CardImg top width='100%' src={women} alt='Card image cap' />
              <CardBody className='text-center'>
                <CardTitle className='text-center fontfam shop-font'>
                  Women's Collection Shop
                </CardTitle>
                <Button className='mt-2' onClick={() => womenWear()}>
                  Check Here
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Slider;

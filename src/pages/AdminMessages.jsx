import React from 'react';
import AdminNav from '../components/header/adminNav';
import Headertop from '../components/header/headertop';
import Footer from '../components/footer/footer';
import { useState, useEffect } from 'react';
import { database } from '../config/firebase';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const ButtonMailto = ({ mailto, label }) => {
  return (
    <Link
      to='#'
      target='_blank'
      onClick={(e) => {
        window.location = 'http://www.gmail.com/';
        e.preventDefault();
      }}
      style={{ color: '#fff' }}
    >
      {label}
    </Link>
  );
};

const AdminMessages = (props) => {
  const [array, setArray] = useState({});

  const datahandler = () => {
    database
      .ref('/ecommerce')
      .child('messages')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          setArray(snapshot.val());
        } else {
          setArray({});
        }
      });
  };
  useEffect(() => {
    datahandler();
  }, []);

  const removeItem = (product) => {
    database
      .ref('/ecommerce')
      .child('messages/' + product)
      .remove();
    datahandler();
  };

  if (Object.keys(array).length > 0) {
    return (
      <>
        <Headertop />
        <AdminNav />
        <Container>
          {!!Object.keys(array).length &&
            Object.keys(array).map((product) => (
              <Row
                className='mt-5'
                style={{ backgroundColor: 'rgb(238, 238, 238)' }}
              >
                <Col xs='9' md='9' sm='12' key={product}>
                  <p>
                    <b>Name:</b>
                    {array[product].name}
                  </p>
                  <p>
                    <b>Message:</b>
                    {array[product].message}
                  </p>
                  <p>
                    <b>Email:</b>
                    {array[product].email}
                  </p>
                </Col>
                <Col xs='1' md='1' sm='6' className='pt-4'>
                  <Button>
                    <ButtonMailto
                      label='Reply'
                      mailto='mailto:no-reply@example.com'
                    />
                  </Button>
                </Col>
                <Col xs='2' md='2' sm='6' className='pt-4'>
                  <Button onClick={() => removeItem(product)}>Delete</Button>
                </Col>
              </Row>
            ))}
        </Container>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Headertop />
        <AdminNav />
        <h2 className='text-center mt-5 mb-5'>No Messages available</h2>
        <Footer />
      </>
    );
  }
};

export default AdminMessages;

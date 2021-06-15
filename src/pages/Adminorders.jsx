import React from 'react';
import AdminNav from '../components/header/adminNav';
import Headertop from '../components/header/headertop';
import Footer from '../components/footer/footer';
import { useState, useEffect } from 'react';
import { auth, database } from '../config/firebase';
import { Col, Row, Container, Button } from 'reactstrap';

const AdminOrders = () => {
  const [array, setArray] = useState({});

  const datahandler = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref('/ecommerce')
          .child('orders')
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              {
                Object.keys(snapshot.val()).forEach((product) => {
                  setArray(snapshot.val()[product]);
                });
              }
            } else {
              setArray({});
            }
          });
      }
    });
  };

  useEffect(() => {
    datahandler();
  }, []);

  const update = (array) => {
    console.log(array);
    database
      .ref('ecommerce')
      .child('orders/' + array.userId + '/' + array.Key)
      .update({
        status: 'Delivered',
      });
    datahandler();
  };

  return (
    <>
      <Headertop />
      <AdminNav />
      <Container fluid className='pb-5 mt-2 card-section '>
        <Container>
          <Row>
            <Col xs='12' sm='12' md='12'>
              <h2 className='text-center mt-5 mb-5 ffam'>Client Orders</h2>
            </Col>
          </Row>
          <Row className='pt-2 pl-3 pr-2' style={{ backgroundColor: '#fff' }}>
            {!!Object.keys(array).length &&
              Object.keys(array).map((product, index) => (
                <>
                  <Col xs='12' md='12' sm='12' className='pt-2'>
                    <h3
                      style={{
                        textAlign: 'center',
                        textDecoration: 'underline',
                      }}
                    >
                      Order {index + 1}
                    </h3>
                  </Col>
                  <Col xs='12' md='12' sm='12' className='mt-3' key={product}>
                    <p className='famil'>Name: {array[product].name}</p>
                    <p className='famil'>Phone: {array[product].phone}</p>
                    <p className='famil'>Address: {array[product].address}</p>
                  </Col>
                  {Object.keys(array[product].products).map((prod) => (
                    <Col
                      xs='12'
                      md='4'
                      sm='12'
                      key={prod}
                      className='text-center mt-5 cart-border background pb-3'
                    >
                      <h1 className='text-center famil pt-3'>
                        {array[product].products[prod].company} Shoes
                      </h1>
                      <img
                        src={array[product].products[prod].picture}
                        alt=''
                        className='width'
                      />
                      <p className='text-center famil'>
                        Edition: {array[product].products[prod].edition}
                      </p>
                      <p className='text-center famil'>
                        Wears: {array[product].products[prod].gender}
                      </p>
                      <p className='text-center famil'>
                        Price: {array[product].products[prod].price} PKR
                      </p>
                    </Col>
                  ))}
                  <Col xs='12' md='12' sm='12' className='pt-3'>
                    <p>
                      <b>Status: </b>
                      {array[product].status}
                    </p>
                    <Button onClick={() => update(array[product])}>
                      Delivered
                    </Button>
                  </Col>
                  <Col xs='12' md='12' sm='12' className='pt-3'>
                    <p>
                      <b>Total price: </b>
                      {array[product].totalPrice} PKR
                    </p>
                  </Col>
                </>
              ))}
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
};
export default AdminOrders;

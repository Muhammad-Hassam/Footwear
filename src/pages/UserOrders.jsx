import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Col, Row, Container, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { auth, database } from '../config/firebase';
import Swal from 'sweetalert2';



const UserOrder = () => {
  const [array, setArray] = useState({});

  const datahandler = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref('/ecommerce')
          .child('orders/' + auth.currentUser.uid)
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              setArray(snapshot.val());
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

  const cancel = (product) => {
    if (product.status === 'Not Delivered') {
      Swal.fire({
        title: 'Order Cancel',
        text: 'Are You sure',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.value) {
          database
            .ref('/ecommerce')
            .child('orders/' + auth.currentUser.uid + '/' + product.product)
            .remove();
        }
      });
    } else {
      Swal.fire({
        title: 'Sorry',
        text: 'Your Order has been delivered',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      });
    }
  };

  if (Object.keys(array).length > 0) {
    return (
      <>
        <Header />
        <Container fluid className='pb-5 mt-2 card-section '>
          <Container>
            <Row>
              <Col xs='12' sm='12' md='12'>
                <h2 className='text-center mt-5 mb-5 ffam'>Your Orders</h2>
              </Col>
            </Row>
            <Row
              className='pt-2 pl-3 pr-2 pb-3'
              style={{ backgroundColor: '#fff' }}
            >
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
                        <p className='text-center famil'>
                          Quanity: {array[product].products[prod].quantity}
                        </p>
                      </Col>
                    ))}
                    <Col xs='12' md='12' sm='12' className='pt-3'>
                      <p>
                        <b>Total price: </b>
                        {array[product].totalPrice} PKR
                      </p>
                    </Col>
                    <Col xs='12' md='12' sm='12' className='pt-3'>
                      <p>
                        <b>Status: </b>
                        {array[product].status}
                      </p>
                    </Col>
                    <Col xs='12' md='12' sm='12' className='pt-3'>
                      <Button
                        onClick={() =>
                          cancel({
                            product: product,
                            status: array[product].status,
                          })
                        }
                      >
                        Cancel Order
                      </Button>
                    </Col>
                  </>
                ))}
            </Row>
          </Container>
        </Container>
        <Footer />
      </>
    );
  } else {
    return <h2 className='text-center mt-5 mb-5'>No carts available</h2>;
  }
};

export default UserOrder;

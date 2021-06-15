import { useCart } from '../../config/cartContext';
import './carts.css';
import { useEffect, useState } from 'react';
import { Col, Row, Button, Container } from 'reactstrap';
import { database, auth } from '../../config/firebase';
import { useHistory } from 'react-router-dom';

const Carts = () => {
  const { carts_array, setcarts_array } = useCart();
  const history = useHistory();
  let [totalPrice, setPrice] = useState(0);
  let i = 0;

  const datahandler = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref('/ecommerce')
          .child('carts/' + auth.currentUser.uid)
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              setcarts_array(snapshot.val());
              {
                Object.keys(snapshot.val()).forEach((product) => {
                  const price = parseInt(snapshot.val()[product].price);
                  const quantity = parseInt(snapshot.val()[product].quantity);
                  i += price * quantity;
                });
                setPrice(i);
              }
            } else {
              setcarts_array({});
            }
          });
      } else {
        history.push('/login');
      }
    });
  };

  useEffect(() => {
    datahandler();
  }, []);

  const removeItem = (product) => {
    database
      .ref('/ecommerce')
      .child('carts/' + auth.currentUser.uid + '/' + product)
      .remove();
    datahandler();
  };

  const checkOut = () => {
    database
      .ref('/ecommerce')
      .child('totalprice/' + auth.currentUser.uid)
      .set({
        totalPrice: totalPrice,
      });
    history.push('/Checkout');
  };

  const quanityDec = (product) => {
    if (product.quantity === 1) {
      database
        .ref('/ecommerce')
        .child('carts/' + auth.currentUser.uid + '/' + product.product)
        .update({
          quantity: 1,
        });
    } else {
      let count = product.quantity - 1;
      database
        .ref('/ecommerce')
        .child('carts/' + auth.currentUser.uid + '/' + product.product)
        .update({
          quantity: count,
        });
      datahandler();
    }
  };

  const quanityInc = (product) => {
    let count = product.quantity + 1;
    database
      .ref('/ecommerce')
      .child('carts/' + auth.currentUser.uid + '/' + product.product)
      .update({
        quantity: count,
      });
    datahandler();
  };

  if (Object.keys(carts_array).length > 0) {
    return (
      <>
        <Container fluid className='pb-5 mt-2 card-section '>
          <Container>
            <Row>
              <Col xs='12' sm='12' md='12'>
                <h2 className='text-center mt-5 mb-5 ffam'>Your Items</h2>
              </Col>
            </Row>
            <Row>
              {!!Object.keys(carts_array).length &&
                Object.keys(carts_array).map((product) => (
                  <Col
                    xs='12'
                    md='4'
                    sm='12'
                    key={product}
                    className='text-center mt-5 cart-border background pb-3'
                  >
                    <h1 className='text-center famil pt-3'>
                      {carts_array[product].company} Shoes
                    </h1>
                    <img
                      src={carts_array[product].picture}
                      alt=''
                      className='width'
                    />
                    <p className='text-center famil'>
                      Edition: {carts_array[product].edition}
                    </p>
                    <p className='text-center famil'>
                      Wears: {carts_array[product].gender}
                    </p>
                    <p className='text-center famil'>
                      Price: {carts_array[product].price}PKR
                    </p>
                    <p className='text-center famil'>
                      Quantity:{' '}
                      <Button
                        onClick={() =>
                          quanityDec({
                            product: product,
                            quantity: carts_array[product].quantity,
                          })
                        }
                      >
                        -
                      </Button>
                      {carts_array[product].quantity}
                      <Button
                        onClick={() =>
                          quanityInc({
                            product: product,
                            quantity: carts_array[product].quantity,
                          })
                        }
                      >
                        +
                      </Button>
                    </p>
                    <Button
                      className='famil'
                      onClick={() => removeItem(product)}
                    >
                      Remove to cart
                    </Button>
                  </Col>
                ))}
            </Row>
            <Row>
              <Col sm='12' md='12' xs='12' className='pt-3'>
                <b>Total Price:</b> {totalPrice} PKR
              </Col>
            </Row>
            <Row className='text-center'>
              <Button className='m-5' onClick={() => checkOut()}>
                CheckOut
              </Button>
            </Row>
          </Container>
        </Container>
      </>
    );
  } else {
    return <h2 className='text-center mt-5 mb-5'>No carts available</h2>;
  }
};

export default Carts;

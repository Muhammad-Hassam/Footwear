import './cards.css';
import { Col, Row, Button, Container } from 'reactstrap';
import { useState, useEffect } from 'react';
import { database } from '../../config/firebase';

const AdminCards = () => {
  const [array, setarray] = useState({});

  const datahandler = () => {
    database
      .ref('/ecommerce')
      .child('posts')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          setarray(snapshot.val());
        } else {
          setarray({});
        }
      });
  };
  useEffect(() => {
    datahandler();
  }, []);

  const removeItem = (product) => {
    database
      .ref('/ecommerce')
      .child('posts/' + product)
      .remove();
  };

  const toggle = (product) => {
    if (product.hidden === false) {
      database
        .ref('ecommerce')
        .child('posts/' + product.product)
        .update({
          hidden: true,
          toggle: 'Show',
        });
    } else {
      database
        .ref('ecommerce')
        .child('posts/' + product.product)
        .update({
          hidden: false,
          toggle: 'Hide',
        });
    }
  };

  if (Object.keys(array).length > 0) {
    return (
      <>
        <Container fluid className='mb-5 pb-5 mt-2 card-section'>
          <Container>
            <Row>
              <Col xs='12' sm='12' md='12'>
                <h2 className='text-center mt-5 mb-5'>All Shoes </h2>
              </Col>
            </Row>
            <Row>
              {!!Object.keys(array).length &&
                Object.keys(array).map((product) => (
                  <Col
                    xs='12'
                    md='4'
                    sm='12'
                    key={product}
                    className='text-center mt-5 cart-border background pb-3'
                  >
                    <h1 className='text-center famil pt-3'>
                      {product.company} Shoes
                    </h1>
                    <img
                      src={array[product].picture}
                      alt=''
                      className='width'
                    />
                    <p className='text-center famil'>
                      Edition: {array[product].edition}
                    </p>
                    <p className='text-center famil'>
                      Wears: {array[product].gender}
                    </p>
                    <p className='text-center famil'>
                      Price: {array[product].price}PKR
                    </p>
                    <Row className='ml-4'>
                      <Col sm='6' md='6' xs='6'>
                        <Button
                          className='famil pl-3 pr-3'
                          onClick={() =>
                            toggle({
                              product: product,
                              toggle: array[product].toggle,
                              hidden: array[product].hidden,
                            })
                          }
                        >
                          {array[product].toggle}
                        </Button>
                      </Col>
                      <Col sm='6' md='6' xs='6'>
                        <Button
                          className='famil'
                          onClick={() => removeItem(product)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                ))}
            </Row>
          </Container>
        </Container>
      </>
    );
  } else {
    return <p className='text-center mt-5 mb-5'>Loading...</p>;
  }
};
export default AdminCards;

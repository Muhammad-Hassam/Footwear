import './cards.css';
import { useCard } from '../../config/Context';
import { Col, Row, Button, Container } from 'reactstrap';
import { useEffect } from 'react';
import { auth } from '../../config/firebase';
import { database } from '../../config/firebase';
import { useCart } from '../../config/cartContext';
import { useHistory } from 'react-router-dom';

const Cards = () => {
  const { post_array, setpost_array } = useCard();
  const { addCart } = useCart();
  const history = useHistory();

  useEffect(() => {
    database
      .ref('/ecommerce')
      .child('posts')
      .on('value', (snapshot) => {
        setpost_array(Object.values(snapshot.val()));
      });
  }, []);

  const authentication = (product) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        addCart(product);
      } else {
        history.push('/login');
      }
    });
  };
  const cards = post_array.filter((post) => post.hidden === false);

  if (cards.length > 0) {
    return (
      <>
        <Container fluid className='mb-5 pt-5 pb-5 card-section'>
          <Container>
            <Row>
              <Col xs='12' sm='12' md='12'>
                <h2 className='text-center mb-5'>Choose Your Shoes</h2>
              </Col>
            </Row>
            <Row>
              {cards.map((product, index) => (
                <Col
                  xs='12'
                  md='4'
                  sm='12'
                  key={index}
                  className='text-center cart-border background pb-3 mb-2 '
                >
                  <h1 className='text-center famil pt-3'>
                    {product.company} Shoes
                  </h1>
                  <img src={product.picture} alt='' className='width' />
                  <p className='text-center famil'>
                    Edition: {product.edition}
                  </p>
                  <p className='text-center famil'>Wears: {product.gender}</p>
                  <p className='text-center famil'>Price: {product.price}PKR</p>
                  <Button
                    onClick={() => authentication(product)}
                    className='famil'
                  >
                    Add to cart
                  </Button>
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
export default Cards;

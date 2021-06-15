import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Container, Row, Col, Button } from 'reactstrap';
import { useEffect } from 'react';
import { database, auth } from '../config/firebase';
import { useCard } from '../config/Context';
import { useCart } from '../config/cartContext';
import { useHistory } from 'react-router-dom';

const Women = () => {
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
        history.push('/cartitem');
      } else {
        history.push('/login');
      }
    });
  };

  const male_wear = post_array.filter((post) => post.gender === 'female');

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs='12' sm='12' md='12' style={{ fontFamily: 'monospace' }}>
            <h2 className='text-center pt-5'>Women's Collection</h2>
          </Col>
        </Row>
        <Row>
          {male_wear.map((product, index) => (
            <Col
              xs='12'
              md='4'
              sm='12'
              key={index}
              className='text-center mt-5 cart-border background pb-3'
            >
              <h1 className='text-center famil pt-3'>
                {product.company} Shoes
              </h1>
              <img src={product.picture} alt='' className='width' />
              <p className='text-center famil'>Edition: {product.edition}</p>
              <p className='text-center famil'>Wears: {product.gender}</p>
              <p className='text-center famil'>Price: {product.price}PKR</p>
              <Button onClick={() => authentication(product)} className='famil'>
                Add to cart
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default Women;

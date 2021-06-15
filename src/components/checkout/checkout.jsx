import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useState, useEffect } from 'react';
import { auth, database } from '../../config/firebase';
import { useHistory } from 'react-router-dom';
import { useCart } from '../../config/cartContext';
import Swal from 'sweetalert2';

const Checkouts = () => {
  const { carts_array, setcarts_array } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();
  const [tPrice, setPrice] = useState('');
  const [cardNo, setcardNo] = useState('');

  const datahandler = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref('/ecommerce')
          .child('carts/' + auth.currentUser.uid)
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              setcarts_array(snapshot.val());
            } else {
              setcarts_array({});
            }
          });
        database
          .ref('/ecommerce')
          .child('totalprice/' + auth.currentUser.uid)
          .on('value', (snapshot) => {
            setPrice(snapshot.val());
          });
      }
    });
  };

  useEffect(() => {
    datahandler();
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeCardNo = (e) => {
    setcardNo(e.target.value);
  };

  const orderPlace = () => {
    const date = new Date();
    const key = date.getTime();
    const timeElapsed = new Date(Date.now()).toLocaleString().split(',')[0];
    console.log(timeElapsed);
    if (!name || !phone || !address || !cardNo) {
      Swal.fire({
        title: 'Kindly fill all the fields',
        type: 'warn',
        text: '',
        timer: 3000,
        showConfirmButton: false,
      });
    } else if (!carts_array) {
      Swal.fire({
        title: 'Carts is empty',
        type: 'warn',
        text: 'Kindly add your cards',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      database
        .ref('/ecommerce')
        .child('orders/' + auth.currentUser.uid + '/' + key)
        .set({
          name: name,
          phone: phone,
          address: address,
          totalPrice: tPrice.totalPrice,
          products: carts_array,
          userId: auth.currentUser.uid,
          status: 'Not Delivered',
          Key: key,
          date: timeElapsed,
        });

      database
        .ref('/ecommerce')
        .child('carts/' + auth.currentUser.uid)
        .remove();
      database
        .ref('/ecommerce')
        .child('totalprice/' + auth.currentUser.uid)
        .remove();
      history.push('/Order');
    }
  };
  return (
    <Container>
      <Row>
        <Col xs='12' sm='12' md='12'>
          <h1 className='text-center mt-5 mb-5 '>Checkout Form</h1>
        </Col>
      </Row>
      <Row>
        <Col xs='12' sm='12' md='12'>
          <Form>
            <FormGroup>
              <Label for='exampleEmail'>Name</Label>
              <input
                className='form-control'
                type='text'
                value={name}
                onChange={onChangeName}
                placeholder='Your Name'
              />
            </FormGroup>
            <FormGroup>
              <Label for='examplePassword'>Phone</Label>
              <input
                className='form-control'
                type='phone'
                value={phone}
                onChange={onChangePhone}
                placeholder='Phone No.'
              />
            </FormGroup>
            <FormGroup>
              <Label for='examplePassword'>Address</Label>
              <input
                className='form-control'
                type='text'
                value={address}
                onChange={onChangeAddress}
                placeholder='Address for Order Delivery'
              />
              <Label for='examplePassword'>Card No</Label>
              <input
                className='form-control'
                type='number'
                value={cardNo}
                onChange={onChangeCardNo}
                placeholder='Enter correct your card No'
              />
            </FormGroup>
            <Button onClick={() => orderPlace()}>Order Place</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkouts;

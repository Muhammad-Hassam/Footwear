import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { database } from '../config/firebase';
import Swal from 'sweetalert2';

const Contact = () => {
  const [email, setemail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    database.ref('/ecommerce').child('messages').push({
      name: name,
      email: email,
      message: message,
    });
    setemail('');
    setName('');
    setMessage('');
    Swal.fire({
      title: 'Message Sent',
      type: 'success',
      text: 'Thanks for your feedback!.',
    });
  };

  const onChangeEmail = (event) => {
    setemail(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs='12' sm='12' md='12' style={{ fontFamily: 'monospace' }}>
            <h2 className='text-center mt-5'>Contact Us</h2>
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='12' md='12'>
            <Form className='pt-5'>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='name'
                  name='email'
                  id='name'
                  placeholder=' Your Name'
                  value={name}
                  onChange={onChangeName}
                />
              </FormGroup>
              <FormGroup>
                <Label for='exampleEmail'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='exampleEmail'
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={onChangeEmail}
                />
              </FormGroup>
              <FormGroup>
                <Label for='exampleText'>Text Area</Label>
                <Input
                  type='textarea'
                  name='text'
                  id='exampleText'
                  value={message}
                  onChange={onChangeMessage}
                />
              </FormGroup>
              <Button onClick={() => onSubmit()}>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};
export default Contact;

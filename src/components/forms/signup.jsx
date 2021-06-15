import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { auth } from '../../config/firebase';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signups = (props) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = ({ email, password }, event) => {
    if (!email || !password) {
      Swal.fire({
        title: 'Kindly fill all the fields',
        type: 'warn',
        text: '',
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      event.preventDefault();

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {
            Swal.fire({
              title: 'Account Created',
              type: 'success',
              icon: 'success',
              text: 'Your account has been created',
              timer: 3000,
              showConfirmButton: true,
            });
            history.push('/login');
          }
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className='form'>
      <Container>
        <Row>
          <Col xs='12' sm='12' md='12'>
            <h1 className='text-center mt-5 mb-5'>Signup Form</h1>
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='12' md='12'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Your name'
                  ref={register}
                />
              </FormGroup>
              <FormGroup>
                <Label for='exampleEmail'>Email</Label>
                <input
                  className='form-control'
                  type='email'
                  name='email'
                  placeholder='email'
                  ref={register}
                />
              </FormGroup>
              <FormGroup>
                <Label for='examplePassword'>Password</Label>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Password'
                  ref={register}
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signups;

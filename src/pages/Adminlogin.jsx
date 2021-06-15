import Headertop from '../components/header/headertop';
import { Container, Row, Col, Button, FormGroup, Label } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import  {auth}  from "../config/firebase";
import { useHistory } from "react-router-dom";
import Footer from "../components/footer/footer"
import {useState} from "react"


const Adminlogin=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const history=useHistory();
  
    const onSubmit=()=>{
      auth.signInWithEmailAndPassword(email, password)
          .then(() => {
             if(auth.currentUser.email==="footwearadmin@gmail.com"){
                history.push("/AdminDashboard")
             }
             else{
               history.push("/adminlogin");
               auth.signOut();
             }
          })
          .catch(error => alert(error.message))
  }
 
  const onChangeEmail=(e)=>{
    setEmail(e.target.value);
  }

  const onChangePassword=(e)=>{
    setPassword(e.target.value);
  }
  return(
      <>
    <Headertop/>
    <div className="form">
   <Container>
     <Row>
       <Col xs="12" sm="12" md="12">
     <h1 className="text-center mt-5 mb-5 ">Admin Login</h1>
     </Col>
     </Row>
     <Row>
       <Col xs="12" sm="12" md="12">
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <input className="form-control" type="email" value={email} onChange={onChangeEmail}  placeholder="Email"/>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <input className="form-control" type="password" value={password} onChange={onChangePassword}  placeholder="Password"/>
      </FormGroup>
      <Button onClick={()=>onSubmit()}>Submit</Button>
    </Form>
    </Col>
     </Row>
    </Container>
    </div>
    <Footer/>
    </>
  )
}

export default Adminlogin;
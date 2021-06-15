import React from "react";
import './cards.css';
import { Col, Button, Form, FormGroup, Label, Container } from 'reactstrap';
import { useCard} from "../../config/Context";

const Card_form = () => {
  const {edition,company,price,onChangeCompany,onChangeEdition,onChangePrice,onChangePics,onChangeGender,onSubmit} = useCard();



    return (
      <>
        <Container className='mt-5 mb-5 famil'>
      <Form>
        <FormGroup row>
          <Label for="shoes_edition" ><b>Edition</b></Label>
          <Col xs='12' sm='12' md='12'>
            <input className="form-control" type="text" value={edition} onChange={onChangeEdition} placeholder="Enter your shoes edition name"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="shoes_company"><b>Brand</b></Label>
          <Col xs='12' sm='12' md='12'>
            <input className="form-control" type="text" value={company} onChange={onChangeCompany} placeholder="Enter your shoes brand name"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="shoes_company"><b>Price</b></Label>
          <Col xs='12' sm='12' md='12'>
            <input className="form-control" type="number" value={price} onChange={onChangePrice} placeholder="Enter your shoes price"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile"><b>Image</b></Label>
          <Col xs='12' sm='12' md='12'>
            <input className="form-control" type="file" onChange={onChangePics}  placeholder="Enter your shoes image URL"/>
          </Col>
        </FormGroup>
        <FormGroup row className='pt-3'>
          <Label for="exampleFile"><b>Wear Category</b></Label>
          <Col xs='12' sm='12' md='12'>
         <div  onChange={onChangeGender}>
          <input className="form-check-input " type="radio" value="Male" name="gender" id="inlineRadio1"/>
          <label className="form-check-label" htmlFor="inlineRadio1">Male's Wear</label><br/>
          <input className="form-check-input" type="radio" value="Female" name="gender" id="inlineRadio2" />
          <label className="form-check-label" htmlFor="inlineRadio2">Females' Wear</label>
          </div>
          </Col>
        </FormGroup> 
        <FormGroup check row>
          <Col>
            <Button onClick={onSubmit}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </Container>
      </>
    );
  }
  
  export default Card_form;

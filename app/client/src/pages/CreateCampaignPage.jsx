import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Image, Container, InputGroup, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import OfferComp from '../_components/OfferComp';

function CampaignForm() {
    const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
  
    return (

        
    
      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Campaign URL
            </Form.Label>
            <Col sm={10}>
            <Form.Control type="url" placeholder="Campaign URL" required/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid campaign URL (e.g., https://www.YourCampaignURL.com).
            </Form.Control.Feedback>
            </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
                Camapign Type
            </Form.Label>
            <Col sm={10}>
                <Form.Check
                type="radio"
                label="Product (credit cards, savings accounts, etc.)"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
                checked
                />
                <Form.Check
                type="radio"
                label="Charitable/Social/ESG events"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                />
                <Form.Check
                type="radio"
                label="Articles (news, press releases, etc.)"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                />
                <Form.Check
                type="radio"
                label="Other"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
                />
            </Col>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Campaign Description</Form.Label>
            <Form.Control as="textarea" rows={3} required/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid campaign description.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Campaign Image</Form.Label>
            <br></br>
            <Form.Control type="file" />
        </Form.Group>
        

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Campaign Start Date</Form.Label>
            <Form.Control type="date" placeholder="campaign start date" required/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid campaign start date.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Campaign End Date</Form.Label>
            <Form.Control type="date" placeholder="campaign end date" required/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid campaign end date.
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Maximum Campaign Budget (in $CAD)</Form.Label>
            <Form.Control type="number" placeholder="Campaign Budget (in $CAD)" required/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid Campaign Budget (in $CAD).
            </Form.Control.Feedback>
            <i>*Maximum Campaign Budget refers to the maximum budget allocated for this specific campaign.
              If the # of clicks (converted to $) surpassed this budget, we will close this campaign for you automatically!
            </i>
        </Form.Group>
        

        <Button type="submit" variant="secondary">Create Campaign</Button>
        <br/>
        <br/>
        <br/>
        <br/>
      </Form>

    );
  }
  

class CreateCampaignPage extends React.Component {
	constructor(props){
		super(props);
	}
    render() {
        return (
            <div className="page">
                <h1 align="left" style={{padding: '10px'}} >Create a Campaign</h1>
                <Container>
                    <div align="left">
                        <CampaignForm />
                    </div>
                </Container>
                
            </div>
            
        );
    }
}
function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user
  };
}

const connectedCreateCampaignPage = connect(mapStateToProps)(CreateCampaignPage);
export { connectedCreateCampaignPage as CreateCampaignPage }; 
export { CreateCampaignPage as CreateCampaignPagePlain }; 
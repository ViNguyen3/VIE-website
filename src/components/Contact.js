import { useState } from "react";
import { Col, Row, Container, Form } from "react-bootstrap";
import contactImg from "../assets/images/contact-img.svg";
export const Contact = () =>{

    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});
    const [errors, setErrors] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    // function made to validate inputs: phone number and email
    const validateForm = () => {
        const newErrors = {};
        const phoneNumber = formDetails.phone.replace(/\D/g, "");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (phoneNumber.length !== 10) {
            newErrors.phone = "Phone number must be 10 digits.";
        }

        if (!emailRegex.test(formDetails.email)) {
            newErrors.email = "Email is not valid.";
        }

        setErrors(newErrors);

        const hasErrors = Object.keys(newErrors).length === 0;
        return hasErrors;
    }
    
    //This function asycnonous and handle when the submit buttokn is click which is then will call the node mailer service 
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setButtonText('Sending...');
        let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers:{
               "Content-Type":"Application/json;charset=utf-8", 
            },
            body: JSON.stringify(formDetails),
        });
        //reset the button and the form to initial state 
        setButtonText("Send");
        let result = response.json();
        setFormDetails(formInitialDetails);
        //check if the response object return sucessfully after sending the email
        if(result.code == 200)
        {
            setStatus({success: true, message: 'Message sent successfully'});
        }else{
            setStatus({success: false, message: 'Please try again later'});
        }
    }

    return(
        <section className="contact" id="connect">
            <Container> 
                <Row className="align-items-center">   
                    <Col md={6}>   
                        <img src={contactImg} alt="Contact Us"/>
                    </Col>
                    <Col md={6}>
                        <h2>Send us a Message!</h2>   
                        <Form onSubmit={handleSubmit}>
                            <Row>   
                                <Col sm={6} className="px-1 mb-3"> 
                                    <Form.Group>
                                        <Form.Control
                                        type = "text"
                                        value = {formDetails.firstName}
                                        placeholder = "First Name"
                                        onChange = { (e) => onFormUpdate("firstName", e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="px-1 mb-3"> 
                                    <Form.Group>
                                        <Form.Control
                                        type = "text"
                                        value = {formDetails.lastName}
                                        placeholder = "Last Name"
                                        onChange = { (e) => onFormUpdate("lastName", e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={6} className="px-1 mb-3"> 
                                    <Form.Group>
                                        <Form.Control
                                        type = "email"
                                        value = {formDetails.email}
                                        placeholder = "Email"
                                        onChange = { (e) => onFormUpdate("email", e.target.value)}
                                        isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col sm={6} className="px-1 mb-3"> 
                                    <Form.Group>
                                        <Form.Control
                                        type = "tel"
                                        value = {formDetails.phone}
                                        placeholder = "Phone Number"
                                        onChange = { (e) => onFormUpdate("phone", e.target.value)}
                                        isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col sm={12} className="px-1 mb-3">
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={6}
                                            value={formDetails.message}
                                            placeholder="Message"
                                            onChange={(e) => onFormUpdate("message", e.target.value)}
                                        />
                                    </Form.Group>
                                    <button type="submit" className="btn btn-primary mt-3">
                                        {buttonText}
                                    </button>
                                </Col>

                                {
                                    status.message && 
                                    <Col>  
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>  
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
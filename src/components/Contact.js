import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
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

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }
    
    //This function asycnonous and handle when the submit buttokn is click which is then will call the node mailer service 
    const handleSubmit = async(e) => {
        e.preventDefault();
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
                        <h2>Get In Touch</h2>   
                        <form onSubmit={handleSubmit}>
                            <Row>   
                                <Col sm={6} className="px-1"> 
                                    <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName',e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1"> 
                                    <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName',e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1"> 
                                    <input type="email" value={formDetails.email} placeholder="Email" onChange={(e) => onFormUpdate('email',e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-1"> 
                                    <input type="tel" value={formDetails.phone} placeholder="Phone Number" onChange={(e) => onFormUpdate('phone',e.target.value)} />
                                </Col>
                                <Col>
                                    <textarea row="6" value={formDetails.mesasge} placeholder="Message" onChange={(e) => onFormUpdate('phone',e.target.value)}></textarea>
                                    <button type="submit"></button>
                                </Col>
                                {
                                    status.message && 
                                    <Col>  
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>  
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
import {useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap"; 
import {App, ArrowRightCircle} from "react-bootstrap-icons"; 
import headerImg from "../assets/images/pinklabubu.png"; 
import TrackVisibility from 'react-on-screen';
import 'animate.css';


export const Banner = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["User!"];
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 2000; 

    useEffect(()=> {
        let ticker = setInterval(() => {
            tick();
        },delta)

        return () => { clearInterval(ticker)};
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0,text.length-1) : fullText.substring(0, text.length + 1);
        setText(updatedText);

        if(isDeleting){
            setDelta(prevDelta => prevDelta/2)
        }

        if(!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(period);
        }

        else if (isDeleting && updatedText === '')
        {
            setIsDeleting(false); 
            setLoopNum(loopNum + 1); 
            setDelta(500);
        }
    }

    return(
        <section className= "banner" id="home">
            <Container>
                <Row className="align-items-center"> 
                    <Col xs={12} md={6} xl={7}>
                    <TrackVisibility>
                    {({ isVisible }) =>
                        //if the isVisible is true, then animate_animated animate_fadeIn will work else nothing
                        <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                            <h1>{'Hi '}<span className="wrap">{text}</span></h1>     
                            <p>Welcome to VIE, we hope you have a pleasant time with our service.</p>
                            <button className="my-button" onClick={() => console.log('connect')}>Let's Connect<ArrowRightCircle size={25}></ArrowRightCircle></button>
                        </div>}
                    </TrackVisibility>
                    </Col>
                </Row>
            </Container> 
        </section>
    )
}
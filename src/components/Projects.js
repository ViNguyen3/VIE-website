import { Col, Container, Row, Tab, Nav} from "react-bootstrap";
// import projImg1 from '../assets/images/project-img1.png';
// import projImg2 from '../assets/images/project-img2.png';
// import projImg3 from '../assets/images/project-img3.png';
// import brownlabubu from '../assets/images/brown-labubu.jpg';
// import redlabubu from '../assets/images/redlabubu.jpg';
// import whitelabubu from '../assets/images/edit-white-labubu.jpg';
// import askewlabubu from '../assets/images/askwelabubu.jpg';
// import greenlabubu from '../assets/images/green-grass-labubu.jpg';
import captainlabubu from '../assets/images/captainlabubu.jpg';
import vtuber from '../assets/images/vtuber-preview-pink-girl-v8.png';
import standlabubu from '../assets/images/standlabubu.jpg';
import { ProjectCard } from "./ProjectCard";
import corlorSharp2 from  '../assets/images/color-sharp2.png';
import TrackVisibility from 'react-on-screen';
import 'animate.css';

export const Projects = () => {

    const projects = [
        {
          title: "Pink Girl V1.0",
          description: "Twitch: https://www.twitch.tv/otonagashi123",
          imgUrl: vtuber,
        },
        // {
        //   title: "Business Startup",
        //   description: "Design & Development",
        //   imgUrl: brownlabubu,
        // },
        // {
        //   title: "Business Startup",
        //   description: "Design & Development",
        //   imgUrl: askewlabubu,
        // },
        // {
        //   title: "Business Startup",
        //   description: "Design & Development",
        //   imgUrl: standlabubu,
        // },
        // {
        //   title: "Business Startup",
        //   description: "Design & Development",
        //   imgUrl: greenlabubu,
        // },
        // {
        //   title: "Business Startup",
        //   description: "Design & Development",
        //   imgUrl: redlabubu,
        // },
      ];

   return(
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col>
                        <TrackVisibility>
                        {({ isVisible }) => {
                            // //if the isVisible is true, then animate_animated animate_fadeIn will work else nothing
                            // <div className={isVisible ? "animate__animated animate__bounce" : ""}>                      
                            //     <h2>Projects</h2>
                            //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            // </div>}
                            console.log("Is visible:", isVisible);
                            return (
                              <div className={isVisible ? "animate__animated animate__bounce" : ""}>                      
                                <h2>Projects</h2>
                                <p>Current active projects</p>
                              </div>
                            );
                        }}
                        </TrackVisibility>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                        <Nav.Item>
                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Tab 3</Nav.Link>
                            </Nav.Item> 
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Row>
                                    {
                                        projects.map((project,index) => {
                                            return(
                                                // <p>{project.title}</p> 
                                                <ProjectCard 
                                                    key={index}
                                                    {...project}
                                                    /> 
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">COMMING SOON!</Tab.Pane>
                            <Tab.Pane eventKey="third">COMMING SOON!</Tab.Pane>
                        </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            {/* <img className="background-image-right" src={corlorSharp2}></img> */}
        </section>
   ) 
}
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import bakery from "../home/HomeComponents/HomeImg/bakeryLogo.png";

class AppHeader2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    render() {
        return (
            <div>
                <Navbar expand="false" className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">
                            <img src={bakery} style={{ width: "50px", height: "50px" }} />
                            <span>onload</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="offcanvasNavbar-expand" onClick={this.handleShow} />
                    </Container>
                </Navbar>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Nav.Link as={Link} to="/">
                            <Modal.Title>
                                {" "}
                                <img src={bakery} style={{ width: "50px", height: "50px" }} />
                                <span>onload</span>
                            </Modal.Title>
                        </Nav.Link>
                    </Modal.Header>
                    <Modal.Body>
                        <Nav className="justify-content-center flex-grow-1 pe-3">
                            <Nav.Link as={Link} to="/map">
                                Map
                            </Nav.Link>
                            <Nav.Link as={Link} to="/comunity">
                                Comunity
                            </Nav.Link>
                            <Nav.Link as={Link} to="/qna">
                                Q&A
                            </Nav.Link>
                            {this.props.authenticated ? (
                                <React.Fragment>
                                    <Nav.Link as={Link} to="/profile">
                                        Profile
                                    </Nav.Link>
                                    <Nav.Link>
                                        <a onClick={this.props.onLogout} style={{ color: "red" }}>
                                            Logout
                                        </a>
                                    </Nav.Link>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Nav.Link as={Link} to="/login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/signup">
                                        Signup
                                    </Nav.Link>
                                </React.Fragment>
                            )}
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default AppHeader2;

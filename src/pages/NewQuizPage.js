import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Container,
    Row,
    Col,
    Navbar,
    NavbarBrand,
    Form,
    FormGroup,
    Label,
    Input,
    Button } from 'reactstrap';
import './NewQuizPage.css'



export class NewQuizzPage extends Component {

    render(){
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar color='dark' dark expand='md' style={{marginLeft: -15, marginRight: -15}}>
                            <Link to='/' className='material-icons text-light mr-3' style={{textDecoration:'none'}}>arrow_back</Link>
                            <NavbarBrand style={{color: 'gainsboro'}}>Create New Quizz</NavbarBrand>
                        </Navbar>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col md={{size: 8, offset: 2}} xl={{size: 6, offset: 3}}>
                        <h4>Basic Information</h4>
                        <Form>
                            <FormGroup row>
                                <Label md='3' xl='2' for='quizz-title'>Quizz Title:</Label>
                                <Col md='9' xl='10'>
                                    <Input id='quizz-title'></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md='3' xl='2' for='brief-desc'>Brief Description:</Label>
                                <Col md='9' xl='10'>
                                    <Input id='brief-desc'></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md='3' xl='2' for='intro-para'>Intro Paragraph:</Label>
                                <Col md='9' xl='10'>
                                    <Input type='textarea' id='intro-para'></Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col md={{size: 8, offset: 2}} xl={{size: 6, offset: 3}}>
                        <div> 
                            <h4 className='d-inline'>Editing Question 1 of 1</h4>
                            <Button id='arrow-right' color='primary' className='material-icons'>
                                keyboard_arrow_right
                            </Button>
                            <Button id='arrow-left' color='primary' className='material-icons'>
                                keyboard_arrow_left
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
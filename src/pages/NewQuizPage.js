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
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button } from 'reactstrap';
import { FloatingButton } from '../components/FloatingButton'



export class NewQuizzPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            quiz_title: '',
            quiz_brief: '',
            quiz_text:  '',
            questions:  [{
                text: '',
                answers: ['', '', '', ''],
                correct_index: 0
            }],
            curr_index: 0
        }
    }



    onArrowBtnClicked(event, offset) {
        this.setState({
            ...this.state,
            curr_index: Math.max(0, Math.min(this.state.questions.length-1, this.state.curr_index+offset))
        })
    }



    onDeleteBtnPressed(event) {
        let new_questions = this.state.questions
        new_questions.splice(this.state.curr_index, 1)

        let new_index = Math.min(this.state.curr_index, this.state.questions.length-1)

        this.setState({
            ...this.state,
            questions: new_questions,
            curr_index: new_index
        })
    }



    onAddQuestionBtnClicked(event) {
        let new_questions = this.state.questions;
        new_questions.push({
            text: '',
            answers: ['', '', '', ''],
            correct_index: 0
        })

        this.setState({
            ...this.state,
            questions: new_questions,
            curr_index: this.state.questions.length-1
        })
    }



    onNewAnswerBtnClicked(event) {
        console.log('onNewAnswerBtnClicked()');

        let new_questions = this.state.questions;
        new_questions[this.state.curr_index].answers.push('');

        this.setState({
            ...this.state,
            questions: new_questions
        })
    }



    render(){
        const curr_index = this.state.curr_index;
        const answers_block = this.state.questions[curr_index].answers.map(e => {
            return(
                <InputGroup className='mt-3'>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <Input addon type="radio" name='radio' aria-label='radio' />
                    </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder='An answer.' />
                </InputGroup>
            );
        })

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
                            <FormGroup>
                                <Label for='quizz-title'>Quizz Title:</Label>
                                <Input id='quizz-title'></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for='brief-desc'>Brief Description:</Label>
                                <Input id='brief-desc'></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for='intro-para'>Intro Paragraph:</Label>
                                <Input type='textarea' id='intro-para'></Input>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col md={{size: 8, offset: 2}} xl={{size: 6, offset: 3}}>
                        <div> 
                            <h4 className='d-inline'>Editing Question {this.state.curr_index+1} of {this.state.questions.length}</h4>

                            <Button color='primary' className='material-icons ml-3' onClick={e => this.onAddQuestionBtnClicked(e)}>
                                add
                            </Button>
                        
                            <Button color='primary' className='material-icons ml-3' 
                                    disabled={(this.state.curr_index < 1)} onClick={e => this.onArrowBtnClicked(e, -1)}>
                                arrow_back
                            </Button>

                            <Button color='primary' className='material-icons ml-3' 
                                    disabled={this.state.curr_index >= this.state.questions.length-1} onClick={e => this.onArrowBtnClicked(e, 1)}>
                                arrow_forward
                            </Button>

                            <Button color='danger' className='material-icons float-right' 
                                    disabled={this.state.questions.length <= 1} onClick={e => this.onDeleteBtnPressed(e)}>
                                delete
                            </Button>
                        </div>

                        <Form className='mt-3'>
                            <FormGroup>
                                <Label for='question_txt'>Question Text:</Label>
                                <Input type='textarea' id='question_txt'></Input>
                            </FormGroup>
                        </Form>

                        <h5>Answers</h5>
                        <Form className='mb-3'>
                            <FormGroup tag='fieldset'>
                                {answers_block}
                            </FormGroup>

                            <Button block color='primary' onClick={e => this.onNewAnswerBtnClicked(e)}>
                                New Answer
                            </Button>
                        </Form>
                    </Col>
                </Row>

                <FloatingButton>
                    <Button block color='link' className='text-white material-icons' 
                            style={{textDecoration: 'none', height: '100%'}}>
                        done
                    </Button>
                </FloatingButton>
            </Container>
        );
    }
}
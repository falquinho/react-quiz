import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    Navbar, 
    NavbarBrand, 
    Container,
    Row,
    Col,
    Alert,
    Button,
    Card,
    CardTitle,
    CardBody,
    CardText,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup } from 'reactstrap';
import './style.css'


const mapReduxStateToProps = state => ({
    quizzes: state.quizzes
});    


class QuizPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quiz: props.quizzes[props.match.params.index],
            curr_question:  -1,
            checked_answer: 0,
            answers_map: {}
        }
    }



    onBeginOrNextBtnClicked(evt) {
        this.setState({
            ...this.state,
            curr_question: this.state.curr_question+1
        });
    }



    onAnswerBtnClicked(evt) {
        let new_map = Object.assign({}, this.state.answers_map);
        new_map[this.state.curr_question] = this.state.checked_answer;
        this.setState({
            ...this.state,
            answers_map: new_map
        });
    }



    onAnswerChanged(evt, index) {
        this.setState({
            ...this.state,
            checked_answer: index
        });
    }



    getInputClassName(index) {
        if (!this.state.quiz)
            return '';

        const curr_question = this.state.curr_question;
        const question = this.state.quiz.questions[curr_question];
        const answer_map = this.state.answers_map;

        if (answer_map[curr_question] !== index)
            return '';
        else if (question.correct_index === answer_map[curr_question])
            return 'correct-answer';
        else   
            return 'wrong-answer';
    }



    calcNoCorrectAnswers() {
        let no_correct = 0;
        let answers_map = this.state.answers_map;
        let questions   = this.state.quiz.questions;
        for (var i=0; i<questions.length; i++) {
            if (questions[i].correct_index === answers_map[i])
                no_correct++;
        }
        return no_correct;
    }



    render(){
        const quiz = this.state.quiz;
        const curr_question  = this.state.curr_question;
        const checked_answer = this.state.checked_answer;
        const answer_map     = this.state.answers_map;

        let error_conditional = typeof this.state.quiz === 'undefined';
        let intro_conditional = !error_conditional && curr_question < 0;
        let quest_conditional = !error_conditional && curr_question >= 0 && curr_question < quiz.questions.length;
        let reslt_conditional = !error_conditional && curr_question >= quiz.questions.length;

        return(
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar color='dark' dark expand='md' style={{marginLeft: -15, marginRight: -15}}>
                            <Link to='/' className='material-icons text-light mr-3' style={{textDecoration:'none'}}>arrow_back</Link>
                            <NavbarBrand style={{color: 'gainsboro'}}>{this.state.quiz? this.state.quiz.title : 'Not Found'}</NavbarBrand>
                        </Navbar>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={{size: 10, offset: 1}} xl={{size: 6, offset: 3}}>
                        { error_conditional &&
                            <Alert color='danger'>
                                <h4 className='alert-heading'>Something went wrong :(</h4>
                                <p>The Quiz was not found. Please go back and try again.</p>
                            </Alert>
                        }

                        { intro_conditional &&
                             <Card>
                                <CardBody>
                                    <CardText>{this.state.quiz.paragraph}</CardText>
                                    <Button color='primary' style={{float: 'right'}} onClick={evt => this.onBeginOrNextBtnClicked(evt)}>
                                        Begin
                                    </Button>
                                </CardBody>
                            </Card>
                        }  

                        { quest_conditional &&
                            <Card>
                                <CardBody>
                                    <CardTitle>Question {curr_question+1} of {quiz.questions.length}</CardTitle>
                                    <CardText>{quiz.questions[curr_question].text}</CardText>
                                    {quiz.questions[curr_question].answers.map((answer, index) => 
                                        <FormGroup key={index} tag='fieldset'>
                                            <InputGroup className='mt-3'>
                                                <Input className={this.getInputClassName(index)} readOnly value={answer}>
                                                </Input>

                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>
                                                        <Input addon type="radio" name='radio' aria-label='radio' 
                                                               checked={this.state.checked_answer === index}
                                                               onChange={evt => this.onAnswerChanged(evt, index)}>
                                                        </Input>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    )}

                                    { typeof this.state.answers_map[curr_question] !== 'undefined'? (
                                        <Button color='primary' style={{float: 'right'}} onClick={evt => this.onBeginOrNextBtnClicked(evt)}>
                                            Next
                                        </Button>
                                    ):(
                                        <Button color='primary' style={{float: 'right'}} onClick={evt => this.onAnswerBtnClicked(evt)}>
                                            Answer
                                        </Button>
                                    )}
                                </CardBody>
                            </Card>
                        }

                        { reslt_conditional &&
                            <Card className='result-card'>
                                <CardBody>
                                    <CardTitle>Final Score</CardTitle>
                                    <CardText>{this.calcNoCorrectAnswers()} of {quiz.questions.length} questions.</CardText>
                                </CardBody>
                            </Card>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}



export default connect(mapReduxStateToProps)(QuizPage);
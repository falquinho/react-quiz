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
import { thunkGetQuiz } from '../redux/Thunks';
import './style.css'


const mapReduxStateToProps = state => ({
    quiz: state.quiz,
    quiz_state: state.quiz_state
});    


class QuizPage extends Component {
    constructor(props) {
        super(props);

        console.log('QuizPage props: ', props);

        this.state = {
            quiz_key: +props.match.params.db_key,
            curr_question:  -1,
            checked_answer: 0,
            answers_map: {}
        }

        props.dispatch(thunkGetQuiz(this.state.quiz_key));
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
        if (!this.props.quiz)
            return '';

        const curr_question = this.state.curr_question;
        const question = this.props.quiz.questions[curr_question];
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
        let questions   = this.props.quiz.questions;
        for (var i=0; i<questions.length; i++) {
            if (questions[i].correct_index === answers_map[i])
                no_correct++;
        }
        return no_correct;
    }



    render(){
        console.log('QuizPage.render()::props: ', this.props);
        const quiz = this.props.quiz;
        const curr_question = this.state.curr_question;

        return(
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar color='dark' dark expand='md' style={{marginLeft: -15, marginRight: -15}}>
                            <Link to='/' className='material-icons text-light mr-3' style={{textDecoration:'none'}}>arrow_back</Link>
                            <NavbarBrand style={{color: 'gainsboro'}}>{this.props.quiz? this.props.quiz.title : 'Not Found'}</NavbarBrand>
                        </Navbar>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={{size: 10, offset: 1}} xl={{size: 6, offset: 3}}>
                        { this.props.quiz_state === 'error' &&
                            <Alert color='danger'>
                                <h4 className='alert-heading'>Something went wrong :(</h4>
                                <p>We could not retrieve the quiz. Please go back and try again.</p>
                            </Alert>
                        }

                        { this.props.quiz_state === 'fetching' && 
                            <Card className='loading-card'>
                            </Card>
                        }

                        { this.props.quiz_state === 'done' && curr_question < 0 &&
                            <Card>
                                <CardBody>
                                    <CardText>{this.props.quiz.paragraph}</CardText>
                                    <Button color='primary' style={{float: 'right'}} onClick={evt => this.onBeginOrNextBtnClicked(evt)}>
                                        Begin
                                    </Button>
                                </CardBody>
                            </Card>
                        }  

                        { this.props.quiz_state === 'done' && curr_question >= 0 && curr_question < quiz.questions.length &&
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

                        { this.props.quiz && curr_question >= quiz.questions.length &&
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
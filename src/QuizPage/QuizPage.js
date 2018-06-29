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
    CardText } from 'reactstrap';



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



    render(){
        let error_conditional = typeof this.state.quiz === 'undefined';
        let intro_conditional = !error_conditional && this.state.curr_question < 0;
        let quest_conditional = !error_conditional && this.state.curr_question >= 0 && this.state.curr_question < this.state.quiz.questions.length;
        let reslt_conditional = !error_conditional && this.state.curr_question >= this.state.quiz.questions.length;
        
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
                                    <CardTitle>Question {this.state.curr_question+1} of {this.state.quiz.questions.length}</CardTitle>
                                    <CardText>{this.state.quiz.questions[this.state.curr_question].text}</CardText>
                                    {typeof this.state.answers_map[this.state.curr_question] !== 'undefined'? (
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
                            <Card>
                                <CardBody>
                                    <CardTitle>Final Score</CardTitle>
                                    <CardText>X out of Y questions.</CardText>
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
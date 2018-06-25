import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    Navbar, 
    NavbarBrand, 
    Container,
    Row,
    Col,
    Alert } from 'reactstrap';



const mapReduxStateToProps = state => ({
    quizzes: state.quizzes
});    


class QuizPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quiz: props.quizzes[props.match.params.index],
            curr_question:  -1
        }
    }



    render(){
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar color='dark' dark expand='md' style={{marginLeft: -15, marginRight: -15}}>
                            <Link to='/' className='material-icons text-light mr-3' style={{textDecoration:'none'}}>arrow_back</Link>
                            <NavbarBrand style={{color: 'gainsboro'}}>{this.state.quiz? this.state.quiz.quiz_title : 'Not Found'}</NavbarBrand>
                        </Navbar>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={{size: 10, offset: 1}} xl={{size: 6, offset: 3}}>
                        {typeof this.state.quiz === 'undefined'? (
                            <Alert color='danger'>
                                <h4 className='alert-heading'>Something went wrong :(</h4>
                                <p>The Quiz was not found. Please go back and try again.</p>
                            </Alert>
                        ):(
                            <p>Quiz found!</p>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}



export default connect(mapReduxStateToProps)(QuizPage);
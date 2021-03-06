import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    Navbar, 
    NavbarBrand, 
    Nav,
    Container,
    Row,
    Col,
    UncontrolledAlert,
    Card } from 'reactstrap';
import QuizThumb from '../QuizThumb/QuizThumb';
import { FloatingButton } from '../FloatingButton/FloatingButton';
import { thunkGetQuizzes } from '../redux/Thunks';
import './style.css';



const mapStateToProps = state => {
    return { 
        quizzes: state.quizzes,
        quizzes_state: state.quizzes_state
    };
};



class CollectionPage extends Component {
    constructor(props) {
        super(props);
        props.dispatch(thunkGetQuizzes());
    }
    
    render() {
        const thumb_list = this.props.quizzes.map((value, index) => {
            return (
                <Col key={index} md='6' style={{marginBottom: 30}}>
                    <QuizThumb quiz_meta={value} dispatch={this.props.dispatch}/>
                </Col>
            )
        });
    
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar color='dark' dark expand='md' style={{marginLeft: -15, marginRight: -15}}>
                            <NavbarBrand style={{color: 'gainsboro'}}>Quiz Collection</NavbarBrand>
                            <Nav className='ml-auto' navbar></Nav>
                        </Navbar>
                    </Col>
                </Row>
                <Row style={{marginTop: 30, paddingBottom: 64}}>
                    <Col md={{size: 8, offset: 2}} xl={{size: 6, offset: 3}}>
                        {this.props.quizzes_state === 'fetching' && 
                            <Row>
                                <Col md='6' style={{marginBottom: 30}}>
                                    <Card className='loading-card'/>
                                </Col>
                                <Col md='6' style={{marginBottom: 30}}>
                                    <Card className='loading-card'/>
                                </Col>
                            </Row>
                        }

                        {this.props.quizzes_state === 'error' && 
                            <div style={{width: '100%'}}>
                                <UncontrolledAlert color='danger'>
                                    <h4 className='alert-heading'>Something went wrong :(</h4>
                                    <p>We had a problem retrieving your quizzes. Please try again.</p>
                                </UncontrolledAlert>
                            </div>
                        }
                        
                        {this.props.quizzes_state === 'done' && thumb_list.length > 0 &&
                            <Row>
                                {thumb_list}
                            </Row>
                        }
                        
                        {this.props.quizzes_state === 'done' && !thumb_list.length &&
                            <div style={{width: '100%'}}>
                                <UncontrolledAlert color='info'>
                                    <h4 className='alert-heading'>Welcome to React Quiz!</h4>
                                    <p>Click on the + floating button bellow to create a new Quiz.</p>
                                </UncontrolledAlert>
                            </div>
                        }
                    </Col>
                </Row>
    
                <FloatingButton>
                    <Link id='btn-link' to='/new' className='material-icons text-white'>add</Link>
                </FloatingButton>
            </Container>
        );
    }
}



export default connect(mapStateToProps)(CollectionPage);
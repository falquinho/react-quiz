import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    Navbar, 
    NavbarBrand, 
    Nav,
    Container,
    Row,
    Col,
    UncontrolledAlert } from 'reactstrap';
import QuizThumb from '../QuizThumb/QuizThumb';
import { FloatingButton } from '../FloatingButton/FloatingButton';



const mapReduxStateToProps = state => ({
    quizzes: state.quizzes
});



const collectionPage = props => {

    const thumb_list = props.quizzes.map((value, index) => {
        return (
            <Col md='6' xl='4' style={{marginBottom: 30}}>
                <QuizThumb quiz={value} key={index} index={index}/>
            </Col>)
    });

    const link_style = {
        textAlign: 'center', 
        lineHeight: 2.6, 
        textDecoration: 'none', 
        height: '100%', width: '100%'
    }

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
                <Col md={{size: 10, offset: 1}} xl={{size: 6, offset: 3}}>
                    <Row>
                        { thumb_list.length? thumb_list: (
                            <div style={{width: '100%'}}>
                                <UncontrolledAlert color='info'>
                                    <h4 className='alert-heading'>Welcome to React Quiz!</h4>
                                    <p>Click on the + floating button bellow to create a new Quiz.</p>
                                </UncontrolledAlert>
                            </div>
                        ) }
                    </Row>
                </Col>
            </Row>

            <FloatingButton>
                <Link to='/new' className='material-icons text-white' style={link_style}>add</Link>
            </FloatingButton>
        </Container>
    );
}



export default connect(mapReduxStateToProps)(collectionPage);
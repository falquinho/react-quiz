import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
    Navbar, 
    NavbarBrand, 
    Nav,
    Container,
    Row,
    Col } from 'reactstrap';
import { QuizzThumb } from '../components/QuizzThumb';
import { FloatingButton } from '../components/FloatingButton';



export class CollectionPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quizz_list: [{}, {}, {}, {}, {}, {}, {}]
        }
    }



    render() {
        const thumb_list = this.state.quizz_list.map(e => {
            return (<Col md='6' xl='4' style={{marginBottom: 30}}><QuizzThumb/></Col>)
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
                            <NavbarBrand style={{color: 'gainsboro'}}>Quizz Collection</NavbarBrand>
                            <Nav className='ml-auto' navbar></Nav>
                        </Navbar>
                    </Col>
                </Row>
                <Row style={{marginTop: 30, paddingBottom: 64}}>
                    <Col md={{size: 10, offset: 1}} xl={{size: 8, offset: 2}}>
                        <Row>
                            { thumb_list }
                        </Row>
                    </Col>
                </Row>

                <FloatingButton>
                    <Link to='/new' className='material-icons text-white' style={link_style}>add</Link>
                </FloatingButton>
            </Container>
        );
    }
}
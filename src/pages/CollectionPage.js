import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap'
import { QuizzThumb } from '../components/QuizzThumb'



export class CollectionPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quizz_list: [],
        }
    }



    render() {
        const thumb_list = this.state.quizz_list.map(e => {
            return (<li><QuizzThumb/></li>)
        });

        return (
            <div>
                <Navbar color='light' ligth expand='md'>
                    <NavbarBrand href='/'>Quizz Collection</NavbarBrand>
                    <Nav className='ml-auto' navbar></Nav>
                </Navbar>
            </div>
        );
    }
}
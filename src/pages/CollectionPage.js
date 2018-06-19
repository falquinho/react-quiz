import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
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
                <Navbar>
                    <NavbarBrand>Quizz Collection</NavbarBrand>
                </Navbar>
            </div>
        );
    }
}
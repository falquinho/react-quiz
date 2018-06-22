import React, { Component } from 'react';
import { UncontrolledAlert } from 'reactstrap';



export class FirstQuizinfo extends Component {

    render() {
        return (
            <div style={{margin: 'auto'}}>
                <UncontrolledAlert color='info' style={{boxShadow: '1px 2px 5px gainsboro'}}>
                    <h4 className='alert-heading'>Welcome to React Quiz!</h4>
                    <p>Click on the '+' floating button bellow to create a new Quiz.</p>
                </UncontrolledAlert>
            </div>
        )
    }
}
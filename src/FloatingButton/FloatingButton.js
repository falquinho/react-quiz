import React, { Component } from 'react';
import './style.css'



export class FloatingButton extends Component {

    render() {
        return (
            <div className='circle_button bg-primary'>
                {this.props.children}
            </div>
        );
    }
}
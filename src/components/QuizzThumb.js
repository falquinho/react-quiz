import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
} from 'reactstrap';



export class QuizzThumb extends Component {

    constructor(props){
        super(props);
    }



    render() {
        return(
            <Card body style={{boxShadow: '1px 2px 5px gray'}}>
                <CardBody>
                    <CardTitle>Quizz Title</CardTitle>
                    <CardText>Brief quizz description.</CardText>
                    <Button color='primary' style={{marginLeft: 8, float: 'right'}}>START QUIZZ</Button>
                    <Button color='secondary' style={{float: 'right'}}>delete</Button>
                </CardBody>
            </Card>
        );
    }
}
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
} from 'reactstrap';
import { ACTION_DELETE_QUIZ } from '../redux/Actions'
import './style.css'



const quizThumb = props => {

    const style_obj = {
        animationDelay: String(0.1*props.index)+'s',
    }

    const delete_action = {
        type: ACTION_DELETE_QUIZ,
        payload: props.index
    }

    return(
        <Card id='thumb' body style={style_obj}>
            <CardBody>
                <CardTitle>{props.quiz.title}</CardTitle>
                <CardText>{props.quiz.brief}</CardText>
                <Link id='custom-link' to={'/quiz'+props.index} >START</Link>
                <Button color='danger' size='sm' style={{float: 'right'}} 
                        onClick={evt => {props.dispatch(delete_action)}}>
                    delete
                </Button>
            </CardBody>
        </Card>
    );
}


export default quizThumb;
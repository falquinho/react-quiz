import React, {Component} from 'react';
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
    console.log('quizThumb props: ', props);

    const style_obj = {
        animationDelay: String(0.1*props.index)+'s',
    }

    const link_style = {
        float: 'right',
        textDecoration: 'none',
        marginLeft: 30,
        fontWeight: 'bold',
        lineHeight: '32px'
     }

    const delete_action = {
        type: ACTION_DELETE_QUIZ,
        payload: props.index
    }

    return(
        <Card id='thumb' body style={style_obj}>
            <CardBody>
                <CardTitle>{props.quiz.quiz_title}</CardTitle>
                <CardText>{props.quiz.quiz_brief}</CardText>
                <Link to={'/quiz'+props.index} style={link_style}>START</Link>
                <Button color='danger' size='sm' style={{float: 'right'}} 
                        onClick={evt => {}}>
                    delete
                </Button>
            </CardBody>
        </Card>
    );
}


export default quizThumb;
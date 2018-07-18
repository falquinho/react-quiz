import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
} from 'reactstrap';
import { thunkDeleteQuiz, thunkGetQuizzes } from '../redux/Thunks'
import './style.css'



const quizThumb = props => {

    const delete_callback = event => {
        props.dispatch(thunkDeleteQuiz(props.quiz_meta.db_key));
        props.dispatch(thunkGetQuizzes());
    }

    return(
        <Card id='thumb' body style={{animationDelay: '0.2s'}}>
            <CardBody>
                <CardTitle>{props.quiz_meta.title}</CardTitle>
                <CardText>{props.quiz_meta.brief}</CardText>
                <Link id='custom-link' to={'/quiz'+props.quiz_meta.db_key}>
                    START
                </Link>
                <Button color='danger' size='sm' style={{float: 'right'}} onClick={delete_callback}>
                    delete
                </Button>
            </CardBody>
        </Card>
    );
}


export default quizThumb;
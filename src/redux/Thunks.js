import { 
    quizDBGet,
    quizDBDel,
    quizDBPut
} from "../IDBManager";

import {
    ACTION_UPDATE_QUIZZES
} from './Actions'



export function thunkSaveQuiz(quiz) {
    return function(dispatch) {
        console.log('thunkSaveQuiz()');
        quizDBPut(quiz).then(function(result) {
            console.log('thunkSaveQuiz success!', result);
        }, function(error) {
            console.log('thunkSaveQuiz error: ', error);
        });
    }
}



export function thunkDeleteQuiz(key) {
    return function(dispatch) {
        console.log('thunkDeleteQuiz()');
        quizDBDel(key);
    }
}



export function thunkGetQuizzes() {
    return function(dispatch) {
        console.log('thunkGetQuizzes()');

        dispatch({type: ACTION_UPDATE_QUIZZES, payload: {state: 'fetching', data: []}});
        
        quizDBGet().then(function(result){
            console.log('thunkGetQuizzes success!', result);
            dispatch({type: ACTION_UPDATE_QUIZZES, payload: {state: 'done', data: result}});
            
        }, function(error){
            console.log('thunkGetQuizzes error: ', error)
            dispatch({type: ACTION_UPDATE_QUIZZES, payload: {state: 'error', data: []}});
        });
    }
}



export function thunkGetQuiz(index) {
    return function(dispatch) {
        console.log('thunkGetQuiz()');
    }
}
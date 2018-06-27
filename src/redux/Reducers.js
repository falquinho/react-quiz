import {
    ACTION_SAVE_NEW_QUIZ,
    ACTION_DELETE_QUIZ
} from './Actions'


const initialState = {
    quizzes: []
}



export function reducerEntrypoint(state = initialState, action) {
    console.log('reducerEntrypoint()');

    return {
        quizzes: reducerQuizzes(state.quizzes, action)
    };
}



function reducerQuizzes(state = [], action) {
    let new_quizzes = state.map(value => {
        return {...value};
    });

    switch (action.type) {
        case ACTION_SAVE_NEW_QUIZ:
            new_quizzes.push(action.payload);
            return new_quizzes;

        case ACTION_DELETE_QUIZ:
            new_quizzes.splice(action.payload, 1);
            return new_quizzes;

        default:
            return state;
    }
}
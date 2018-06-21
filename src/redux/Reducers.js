import {
    ACTION_SAVE_NEW_QUIZ,
} from './Actions'


const initialState = {
    quizzes: [],
    new_quiz: undefined
}



export function reducerEntrypoint(state = initialState, action) {
    return ({
        quizzes:    reducerQuizzes(state.quizzes, action)
    });
}



function reducerQuizzes(state = [], action) {
    switch (action.Type) {
        case ACTION_SAVE_NEW_QUIZ:
            let quest_copy = state.questions;
            quest_copy.push(action.payload);
            return quest_copy;

        default:
            return state;
    }
}
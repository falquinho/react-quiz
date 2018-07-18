import {
    ACTION_SAVE_NEW_QUIZ,
    ACTION_DELETE_QUIZ,
    ACTION_UPDATE_QUIZZES,
    ACTION_UPDATE_QUIZ
} from './Actions'


// Possible data states:
//    fetching
//    done
//    error
const initialState = {
    quizzes: [],
    quizzes_state: 'fetching',
    quiz: undefined,
    quiz_state: 'fetching'
}



export function reducerEntrypoint(state = initialState, action) {
    console.log('reducerEntrypoint()');

    return {
        quizzes: reducerQuizzes(state.quizzes, action),
        quizzes_state: reducerQuizzesState(state.quizzes_state, action)
    };
}



function reducerQuizzes(state = [], action) {
    switch (action.type) {
        case ACTION_UPDATE_QUIZZES:
            return action.payload.data;

        default:
            return state;
    }
}



function reducerQuizzesState(state = 'fetching', action) {
    switch(action.type) {
        case ACTION_UPDATE_QUIZZES:
            return action.payload.state;

        default:
            return state;
    }
}

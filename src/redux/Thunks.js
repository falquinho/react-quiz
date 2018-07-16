import { IDBManager } from "../IDBManager";



export function thunkSaveQuiz(quiz) {
    return function(dispatch) {
        console.log('thunkSaveQuiz()');
        let db_manager = new IDBManager();
        let request = db_manager.addQuiz(quiz);

        request.onsuccess = function(event) {
            console.log('thunkSaveQuiz() onsuccess');
        }
        
        request.onerror = function(event) {
            console.log('thunkSaveQuiz() onerror');
        }
    }
}



export function thunkDeleteQuiz(index) {
    return function(dispatch) {
        console.log('thunkDeleteQuiz()');
        let db_manager = new IDBManager();
        let request = db_manager.deleteQuiz(index);
        request.onsuccess = function(event) {
            console.log('thunkDeleteQuiz() onsuccess');
        }

        request.onerror = function(event) {
            console.log('thunkDeleteQuiz() onerror');
        }
    }
}



export function thunkGetQuizzes() {
    return function(dispatch) {
        console.log('thunkGetQuizzes()');
        let db_manager = new IDBManager();
        
        let promise = db_manager.get();
        if (typeof promise === 'undefined')
            console.log('promise is undefined');
            
        promise.then(
            function(val) {
                console.log('thunkGetQuizzes() resolved', val);
            },
            function(val) {
                console.log('thunkGetQuizzes() rejected', val);
            }
        );
    }
}



export function thunkGetQuiz(index) {
    return function(dispatch) {
        console.log('thunkGetQuiz()');

        let db_manager = new IDBManager();
        let request = db_manager.get(index);

        request.onsuccess = function(event) {
            console.log('thunkGetQuiz() onsuccess: ', event.target);
        }

        request.onerror = function(event) {
            console.log('thunkGetQuiz() onerror');
        }
    }
}
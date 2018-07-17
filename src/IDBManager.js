const DB_NAME = 'quiz_db';
const STORE_NAME = 'quiz_db';


function createStore(event) {
    console.log('createStore()');
    let db = event.target.result;
    db.createObjectStore(STORE_NAME, {autoIncrement: true});
}



export function quizDBPut(quiz) {
    return new Promise(function(resolve, reject){
        let db_req = window.indexedDB.open(DB_NAME, 1);
        db_req.onupgradeneeded = createStore;
        db_req.onerror = function(event) {
            reject('addQuiz error opening database!');
        }
        db_req.onsuccess = function(event) {
            let db = event.target.result;
            let transaction = db.transaction([STORE_NAME], 'readwrite');
            let store = transaction.objectStore(STORE_NAME);
            let req = store.add(quiz);
            req.onsuccess = function() {
                resolve('addQuiz success!');
            }
            req.onerror = function() {
                reject('addQuiz error adding to store!');
            }
        }
    });
}



export function quizDBGet() {
    return new Promise(function(resolve, reject){
        let db_req = window.indexedDB.open(DB_NAME, 1);
        db_req.onupgradeneeded = createStore;
        db_req.onerror = function(event) {
            reject('get error opening database');
        }
        db_req.onsuccess = function(event) {
            let quizzes = [];
            let db = event.target.result;
            let obj_store = db.transaction([STORE_NAME]).objectStore(STORE_NAME);
            let cursor_req = obj_store.openCursor();
            cursor_req.onerror = function(event) {
                reject('quizDBGet error opening cursor!');
            }
            cursor_req.onsuccess = function(event) {
                let cursor = event.target.result;
                if(cursor){
                    console.log(cursor.value);
                    quizzes.push({
                        title: cursor.value.title,
                        brief: cursor.value.brief
                    });
                    cursor.continue();

                } else {
                    resolve(quizzes);
                }
            }
        }
    });
}

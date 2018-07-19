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



export function quizDBDel(key) {
    return new Promise(function(resolve, reject){
        let db_req = window.indexedDB.open(DB_NAME, 1);
        db_req.onupgradeneeded = createStore;
        db_req.onerror = function(event) {
            reject('quizDBDel error opening database!');
        }
        db_req.onsuccess = function(event) {
            let transaction = event.target.result.transaction([STORE_NAME], 'readwrite');
            let req = transaction.objectStore(STORE_NAME).delete(key);
            req.onerror = function(event) {
                reject('quizDBDel error on objectStore.delete');
            }
            req.onsuccess = function(event) {
                resolve('quizDBDel objectSotore.delete success!');
            }
        }
    })
}



export function quizDBGetQuiz(key) {
    return new Promise(function(resolve, reject){
        let db_req = window.indexedDB.open(DB_NAME, 1);
        db_req.onupgradeneeded = createStore;
        db_req.onerror = function(event) {
            reject('quizDBGet(key) error opening database!');
        }
        db_req.onsuccess = function(event) {
            let req = event.target.result.transaction([STORE_NAME]).objectStore(STORE_NAME).get(key);
            req.onerror = function(event){
                reject('quizDBGet(key) error gettin quiz with key ', key);
            }
            req.onsuccess = function(event) {
                console.log('quizDBGetQuiz onsuccess event.target:', event.target);
                resolve(event.target.result);
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
                    console.log('cursor.value: ', cursor.value);
                    console.log('cursor.primaryKey: ', cursor.primaryKey);
                    console.log('cursor.key: ', cursor.key);
                    
                    quizzes.push({
                        db_key: cursor.key,
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

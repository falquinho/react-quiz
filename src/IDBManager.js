// TODO; understand and fix why this.db is undefined


export class IDBManager {
    constructor() {
        this.db_request = window.indexedDB.open('quiz_db', 1);
        this.db = undefined;

        this.db_request.onsuccess = function(event) {
            console.log('IDBManager.constructor.open.onsuccess');
            this.db = event.target.result;
        }

        this.db_request.onerror = function(event) {
            console.log('IDBManager.constructor.open.onerror');
            console.log(this.db_request.error);
        }

        this.db_request.onupgradeneeded = function(event) {
            console.log('IDBManager.constructor.open.onupgradeneeded');
            let db = event.target.result;
            db.createObjectStore('quiz_db', {autoIncrement: true});
        }
    }


    // Return the 'request'. Caller must implement 'onsucess' and 'onerror' callbacks
    addQuiz(quiz) {
        if (!this.db) return;

        let transaction = this.db.transaction(['quiz_db', 'readwrite']);
        let store = transaction.objectStore('quiz_db');
        return store.add(quiz);
    }


    // Return the 'request'. Caller must implement 'onsucess' and 'onerror' callbacks
    deleteQuiz(index) {
        if (!this.db) return;

        let transaction = this.db.transaction(['quiz_db'], 'readwrite');
        let store = transaction.objectStore('quiz_db');
        return store.delete(index);
    }


    // Get by index.
    // Return the 'request'. Caller must implement 'onsucess' and 'onerror' callbacks
    get(index) {
        if (!this.db) return;

        // omit the 'readwrite' flag for a read-only transaction
        let transaction = this.db.transaction(['quiz_db']);
        let store = transaction.objectStore('quiz_db');
        return store.get(index);
    }


    // Get all quizzes. Return a promise that will resolve to an array of quizzes metadata.
    get() {
        let this_ = this;
        return new Promise(function(resolve, reject) {
            console.log('typeof this_', typeof this_);

            if (!this.db) reject('IDBManager.db is undefined!');

            let quizzes = [];
            let cursor = this.db.transaction(['quiz_db']).objectStore('quiz_db').openCursor();

            cursor.onSuccess = function(event) {
                let cursor = event.target.result;
                if(cursor) {
                    console.log(cursor.value);
                    quizzes.push({
                        id: cursor.value.index, 
                        title: cursor.value.title, 
                        brief: cursor.value.brief
                    });
    
                } else {
                    console.log('get() cursor finished: ', quizzes);
                    resolve(quizzes);
                }   
            }

            cursor.onerror = function(event) {
                console.log('openCursor() onerror');
                reject('ERROR: openCursor() failed!');
            }
        });// return new Promise()
    }// get()
}
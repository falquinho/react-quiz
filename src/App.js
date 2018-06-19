import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { CollectionPage } from './pages/CollectionPage';
import { NewQuizzPage } from './pages/NewQuizPage';
import { QuizzPage } from './pages/QuizPage';
import './App.css';



class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Route path='/' exact   component={CollectionPage}/>
        <Route path='/new'      component={NewQuizzPage}/>
        <Route path='/quizz_id' component={QuizzPage}/>
      </div>
    );
  }
}

export default App;

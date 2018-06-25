import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CollectionPage from './CollectionPage/CollectionPage';
import NewQuizzPage from './NewQuizPage/NewQuizPage';
import QuizPage from './QuizPage/QuizPage';
import './App.css';



class App extends Component {

  render() {
    return (
      <div className="App">
        <Route path='/' exact component={CollectionPage}/>
        <Route path='/quiz:index' component={QuizPage}/>
        <Route path='/new'    component={NewQuizzPage}/>
      </div>
    );
  }
}

export default App;

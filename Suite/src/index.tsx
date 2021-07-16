import React from 'react';
import ReactDOM from 'react-dom';
import CatSchedule from './components/catschedule';
import GroceryList from './components/grocerylist';
import PlantSchedule from './components/plantschedule';
import TaskList from './components/tasklist';
import './styles/index.scss';
import './styles/suite.scss';

function Index() {

  return (
    <main>
      <header><h1>Sweetie Suite</h1></header>
      <GroceryList />
      <TaskList />
      <CatSchedule />
      <PlantSchedule />
    </main>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import Calender from './components/calender';
import './styles/index.scss';
import DateTime from './components/datetime';
import Weather from './components/weather';
import GroceryList from './components/grocerylist';
import CatSchedule from './components/catschedule';
import TodoList from './components/tasklist';
import PlantSchedule from './components/plantschedule';

function Index() {

  return (
    <div>
      <div id="view">
        <main>
          <div className="tile" id="time">
            <DateTime />
          </div>
          <div className="tile" id="weather">
            <Weather />
          </div>
          <div className="tile" id="calender">
            <Calender />
          </div>
          <div className="tile" id="grocerylist">
            <GroceryList />
          </div>
          <div className="tile" id="tasklist">
            <TodoList />
          </div>
          <div className="tile" id="cats">
            <CatSchedule />
          </div>
          <div className="tile" id="plants">
            <PlantSchedule />
          </div>
        </main>
      </div>
      <div id="back" />
    </div>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

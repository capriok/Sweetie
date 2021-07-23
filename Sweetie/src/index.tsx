import React from 'react';
import ReactDOM from 'react-dom';
import DateTime from './components/DateTime';
import Weather from './components/Weather';
import Calender from './components/Calender';
import Groceries from './components/Groceries';
import TodoList from './components/Tasks';
import Cats from './components/Cats';
import Plants from './components/Plants';

import './styles/index.scss';

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
            <Groceries />
          </div>
          <div className="tile" id="tasklist">
            <TodoList />
          </div>
          <div className="tile" id="cats">
            <Cats />
          </div>
          <div className="tile" id="plants">
            <Plants />
          </div>
        </main>
      </div>
      <div id="back" />
    </div>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

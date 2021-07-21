import React from 'react';
import ReactDOM from 'react-dom';
import Cats from './components/Cats';
import Groceries from './components/Groceries';
import Plants from './components/Plants';
import Tasks from './components/Tasks';
import './styles/index.scss';
import './styles/suite.scss';
import './styles/slidemodal.scss';
import './styles/modalforms.scss';

function Index() {

  return (
    <main className="suite">
      <header><h1>Sweetie Suite</h1></header>
      <Groceries />
      <Tasks />
      <Cats />
      <Plants />
    </main>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

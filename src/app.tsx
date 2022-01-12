import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import useDataFetch from './Hooks/useDataFetch'
import useSocket from './Hooks/useSocket'

import Suite from './Components/Suite/Suite'
import Sweetie from './Components/Sweetie/Sweetie'
import PageNotFound from './Components/Suite/Components/PageNotFound'

const App: React.FC = () => {
  const { socket } = useSocket()
  const { loading, state, dispatch } = useDataFetch(socket)

  if (loading) return <></>

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() =>
          <Suite socket={socket} state={state} dispatch={dispatch} />
        } />
        <Route exact path="/sweetie" render={() =>
          <Sweetie socket={socket} state={state} dispatch={dispatch} />
        } />
        <Route path="*" render={() =>
          <PageNotFound />
        } />
      </Switch>
    </Router>
  )
}


export default App
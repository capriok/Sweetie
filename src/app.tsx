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

  const swtProps = {
    socket,
    state,
    dispatch
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() =>
          <Suite {...swtProps} />
        } />
        <Route exact path="/sweetie" render={() =>
          <Sweetie {...swtProps} />
        } />
        <Route path="*" render={() =>
          <PageNotFound />
        } />
      </Switch>
    </Router>
  )
}


export default App
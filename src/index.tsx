import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { startOfToday } from 'date-fns'
import useDataFetch from './Hooks/useDataFetch'
import useSocket from './Hooks/useSocket'

import Api from './api'
import Splash from './Components/Shared/Splash'
import Suite from './Components/Suite/Suite'
import Sweetie from './Components/Sweetie/Sweetie'
import PageNotFound from './Components/Suite/Components/PageNotFound'

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)
  const { socket } = useSocket()
  const { state, dispatch } = useDataFetch(socket)

  useEffect(() => {
    const ApplicationDate: Date = startOfToday()
    ApplicationDate.setMinutes(ApplicationDate.getMinutes() - ApplicationDate.getTimezoneOffset())
    console.log('ApplicationDate:', ApplicationDate.toJSON())

    if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    Api.ServerPing().then(() => {
      document.getElementById('Splash-icon')?.classList.add('shrink')
      setTimeout(() => {
        setServerIdle(false)
      }, 500)
    })
  }, [])

  return (
    <Router>
      {serverIdle
        ? <Splash />
        : <>
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
        </>
      }
    </Router>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'))

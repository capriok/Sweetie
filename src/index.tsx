import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import useDataFetch from './Hooks/useDataFetch'

import Api from './api'
import Splash from './Components/Common/Splash'
import Suite from './Components/Suite/Suite'
import Sweetie from './Components/Sweetie/Sweetie'

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)
  const { state, dispatch } = useDataFetch()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    Api.ServerPing().then(() => {
      document.getElementById('splash-swt')?.classList.add('shrink')
      setTimeout(() => {
        setServerIdle(false)
      }, 500)
    })
  }, [])

  return (
    <Router>
      {(() => {
        if (serverIdle)
          return <Splash />
        else return <>
          <Route exact path="/" render={() =>
            <Suite state={state} dispatch={dispatch} />
          } />
          <Route exact path="/sweetie" render={() =>
            <Sweetie state={state} dispatch={dispatch} />
          } />
        </>
      })()}
    </Router>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'))

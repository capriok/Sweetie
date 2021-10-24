import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'

import Api from './api'
import Splash from './Components/Common/Splash'
import Suite from './Components/Suite/Suite'
import Sweetie from './Components/Sweetie/Sweetie'

function Index() {

  const [serverIdle, setServerIdle] = useState<boolean>(true)

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
          <Route exact path="/" component={Suite} />
          <Route exact path="/sweetie" component={Sweetie} />
        </>
      })()}
    </Router>

  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'))

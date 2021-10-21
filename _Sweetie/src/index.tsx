import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Div100vh from 'react-div-100vh'

import Api from './api'
import Secret from './Components/Suite/Secret'
import Splash from './Components/Suite/Splash'
import Suite from './Components/Suite/Suite'
import Sweetie from './Components/Sweetie/Sweetie'

function Index() {

  const [serverIdle, setServerIdle] = useState<boolean>(true)
  const [auth, setAuth] = useState<boolean>(false)
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const [mode, setMode] = useState<boolean>(false)

  useEffect(() => {
    const lsMode = localStorage.getItem('Swt-Mode')
    if (lsMode) {
      const mode = JSON.parse(lsMode)
      if (mode['--modebg'] !== 'white') setMode(true)
      document.documentElement.style.setProperty('--modebg', mode['--modebg'])
      document.documentElement.style.setProperty('--modefont', mode['--modefont'])
      document.documentElement.style.setProperty('--modeswt', mode['--modeswt'])
    }

    if (process.env.NODE_ENV === 'development') return setServerIdle(false)
    if (process.env.NODE_ENV === 'production') return console.log = () => { }

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
          <Route exact path="/" render={() => (
            <Div100vh>
              {(() => {
                if (!auth)
                  return <Secret auth={auth} setAuth={setAuth} setReadOnly={setReadOnly} />
                else
                  return <Suite auth={auth} setAuth={setAuth} readOnly={readOnly} setReadOnly={setReadOnly} mode={mode} setMode={setMode} />
              })()}
            </Div100vh>
          )} />
          <Route exact path="/sweetie" render={() => <Sweetie />} />
        </>
      })()}
    </Router>

  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'))

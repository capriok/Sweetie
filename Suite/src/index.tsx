import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Div100vh from 'react-div-100vh'

import Api from './api'
import Secret from './components/Secret'
import Splash from './components/Splash'
import Suite from './components/Suite'

import './styles/index.scss'

function Index() {

  const [serverIdle, setServerIdle] = useState<boolean>(true)
  const [auth, setAuth] = useState<boolean>(false)
  const [readOnly, setReadOnly] = useState<boolean>(true)

  useEffect(() => {
    Api.ServerPing().then(() => {
      document.getElementById('splash-swt')?.classList.add('shrink')
      setTimeout(() => {
        setServerIdle(false)
      }, 1000)
    })
  }, [])

  return (
    <Div100vh>
      {(() => {
        if (serverIdle) return <Splash />

        if (auth)
          return <Suite readOnly={readOnly} />
        else
          return <Secret auth={auth} setAuth={setAuth} setReadOnly={setReadOnly} />
      })()}
    </Div100vh>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

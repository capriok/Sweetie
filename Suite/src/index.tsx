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

    Api.ServerPing().then(() => {
      document.getElementById('splash-swt')?.classList.add('shrink')
      setTimeout(() => {
        setServerIdle(false)
      }, 500)
    })
  }, [])

  return (
    <Div100vh>
      {(() => {
        if (serverIdle)
          return <Splash />
        if (!auth)
          return <Secret auth={auth} setAuth={setAuth} setReadOnly={setReadOnly} />
        else
          return <Suite auth={auth} setAuth={setAuth} readOnly={readOnly} setReadOnly={setReadOnly} mode={mode} setMode={setMode} />
      })()}
    </Div100vh>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'))

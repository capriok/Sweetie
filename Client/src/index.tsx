import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useLocalStorage } from 'Hooks/useLocalStorage'
import Api from './api'

import App from './app'
import Splash from 'Components/Common/Splash'

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)
  const [lsAuth] = useLocalStorage('Swt-Auth')

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    if (lsAuth) {
      const lastAuth = new Date(lsAuth.last).getTime()
      const currTime = new Date().getTime()
      if (currTime - lastAuth < 300000) {
        return setServerIdle(false)
      }
    }

    Api.ServerPing()
      .then(({ status }) => {
        if (status === 200) {
          setTimeout(() => {
            setServerIdle(false)
          }, 1000)
        }
      })
  }, [])

  if (serverIdle) return <Splash />

  return <App />
}

ReactDOM.render(
  <React.StrictMode><Index /></React.StrictMode>,
  document.getElementById('root')
)

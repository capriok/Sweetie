import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { startOfToday } from 'date-fns'
import { useLocalStorage } from 'Hooks/useLocalStorage'
import Api from './api'

import App from './app'
import Splash from 'Components/Common/Splash'

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)
  const [lsAuth] = useLocalStorage('Swt-Auth')
  const isMobile = window.innerWidth < 500

  useEffect(() => {
    const ApplicationDate: Date = startOfToday()
    ApplicationDate.setMinutes(ApplicationDate.getMinutes() - ApplicationDate.getTimezoneOffset())
    console.log('ApplicationDate:', ApplicationDate.toJSON())

    if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    if (isMobile) {
      if (lsAuth) {
        const lastAuth = new Date(lsAuth.last).getTime()
        const currTime = new Date().getTime()
        if (currTime - lastAuth < 300000) {
          return setServerIdle(false)
        }
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

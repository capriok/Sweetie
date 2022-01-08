import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { startOfToday } from 'date-fns'

import Api from './api'
import Splash from './Components/Shared/Splash'
import App from './app'

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)

  useEffect(() => {
    const ApplicationDate: Date = startOfToday()
    ApplicationDate.setMinutes(ApplicationDate.getMinutes() - ApplicationDate.getTimezoneOffset())
    console.log('ApplicationDate:', ApplicationDate.toJSON())

    if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    Api.ServerPing().then(() => {
      document.getElementById('Splash-icon')?.classList.add('shrink')
      setTimeout(() => {
        setServerIdle(false)
      }, 5000)
    })
  }, [])

  if (serverIdle) return <Splash />

  return <App />
}

ReactDOM.render(
  <React.StrictMode><Index /></React.StrictMode>,
  document.getElementById('root')
)

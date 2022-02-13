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

    Api.ServerPing()
      .then(({ status }) => {
        if (status === 200) {
          let t = 29
          const countdown = setInterval(() => {
            if (t < 1) return
            document.getElementById('Splash-message')!.textContent = `Sweetie will wake up in ${t--}`
          }, 1000)
          setTimeout(() => {
            clearInterval(countdown)
            document.getElementById('Splash-content')!.classList.add('shrink')
            setTimeout(() => {
              setServerIdle(false)
            }, 500)
          }, 30000)
        }
      })
      .catch(() => {
        document.getElementById('Splash-message')!.textContent = `Sweetie will not wake up`
      })
  }, [])

  if (serverIdle) return <Splash />

  return <App />
}

ReactDOM.render(
  <React.StrictMode><Index /></React.StrictMode>,
  document.getElementById('root')
)

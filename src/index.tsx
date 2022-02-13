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

    // if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    Api.ServerPing()
      .then(({ status }) => {
        if (status === 200) {
          document.getElementById('Splash-message')!.textContent = 'Ping Success'
          setTimeout(() => {
            let t = 27
            const countdown = setInterval(() => {
              document.getElementById('Splash-message')!.textContent = `Sweetie will wake up in ${t--}`
              if (t < 1) clearInterval(countdown)
            }, 1000)
          }, 2500)
        }
      })
      .catch(() => {
        document.getElementById('Splash-message')!.textContent = 'Ping Failure'
        document.getElementById('Splash-message')!.textContent = `Sweetie will not wake up`
      })
      .finally(() => {
        setTimeout(() => {
          document.getElementById('Splash-content')!.classList.add('shrink')
          setServerIdle(false)
        }, 30000)
      })
  }, [])

  if (serverIdle) return <Splash />

  return <App />
}

ReactDOM.render(
  <React.StrictMode><Index /></React.StrictMode>,
  document.getElementById('root')
)

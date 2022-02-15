import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { startOfToday } from 'date-fns'

import Api from './api'
import Splash from './Components/Shared/Splash'
import App from './app'
import { useLocalStorage } from 'Hooks/useLocalStorage'

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)
  const [lsAuth] = useLocalStorage('Swt-Auth')
  const isMobile = window.innerWidth < 500

  useEffect(() => {
    const ApplicationDate: Date = startOfToday()
    ApplicationDate.setMinutes(ApplicationDate.getMinutes() - ApplicationDate.getTimezoneOffset())
    console.log('ApplicationDate:', ApplicationDate.toJSON())

    // if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    if (isMobile) {
      if (lsAuth) {
        const lastAuth = new Date(lsAuth.last).getTime()
        const currTime = new Date().getTime()
        if (currTime - lastAuth < 300000) {
          return setServerIdle(false)
        }
      }
    }

    const ProgressBar = document.getElementById('Splash-progress')!

    Api.ServerPing()
      .then(({ status }) => {
        if (status === 200) {
          if (isMobile) {
            setTimeout(() => {
              setServerIdle(false)
            }, 1000)
          } else {
            let ms = 0
            const countdown = setInterval(() => {
              let progress = ms++ * 45 / 1000
              if (progress >= 100) {
                clearInterval(countdown)
                return setServerIdle(false)
              }
              ProgressBar.style.width = `${progress}vw`
            }, 10)
          }
        }
      })
      .catch(() => {
        ProgressBar.style.width = '100vw'
        ProgressBar.style.backgroundColor = 'red'
      })
  }, [])

  if (serverIdle) return <Splash />

  return <App />
}

ReactDOM.render(
  <React.StrictMode><Index /></React.StrictMode>,
  document.getElementById('root')
)

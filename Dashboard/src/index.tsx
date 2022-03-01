import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Api from './api'

import Splash from './Components/Common/Splash'
import App from './app'

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return setServerIdle(false)

    const ProgressBar = document.getElementById('Splash-progress')!

    Api.ServerPing()
      .then(({ status }) => {
        if (status === 200) {
          let ms = 0
          const countdown = setInterval(() => {
            let progress = ++ms * 10 / 100
            if (progress >= 100) {
              clearInterval(countdown)
              return setServerIdle(false)
            }

            ProgressBar.style.width = `${progress}vw`
          }, 10)
        }
      })
      .catch((err) => {
        console.log(err)
        if (err) {
          ProgressBar.style.width = '100vw'
          ProgressBar.style.backgroundColor = 'red'
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

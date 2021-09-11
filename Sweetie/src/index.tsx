import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Api from './api'
import Splash from './components/Splash';
import Sweetie from './components/Sweetie';

import './styles/index.scss';

function Index() {
  const [serverIdle, setServerIdle] = useState<boolean>(true)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Api.ServerPing().then(() => {
        document.getElementById('splash-swt')?.classList.add('shrink')
        setTimeout(() => {
          setServerIdle(false)
        }, 500)
      })
      setTimeout(() => {
        window.location.reload()
      }, 300000)
    } else {
      setServerIdle(false)
    }
  }, [])


  return (
    <>
      {(() => {
        if (serverIdle)
          return <Splash />
        else
          return <Sweetie />
      })()}
      <div id="Background" />
    </>
  )

}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'))

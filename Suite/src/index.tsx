import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { differenceInCalendarDays, subDays } from 'date-fns'

import Splash from './components/Splash'
import Calender from './components/Calender'
import Cats from './components/Cats'
import Groceries from './components/Groceries'
import Plants from './components/Plants'
import Tasks from './components/Tasks'

import './styles/index.scss'
import './styles/suite.scss'
import './styles/slidemodal.scss'
import './styles/modalforms.scss'

function Index() {

  const [auth, setAuth] = useState<boolean>(false)
  const [pass, setPass] = useState<string>('')

  useEffect(() => {
    const passcode = process.env.REACT_APP_PASSCODE
    const ls = localStorage.getItem('Swt-Auth')
    if (ls) {
      const lsPass: { pass: string, auth: boolean, last: string } = JSON.parse(ls)
      const dif = Math.abs(differenceInCalendarDays(new Date(lsPass.last), new Date()))

      if (lsPass.pass !== passcode) return
      if (lsPass.auth && dif <= 6) return setAuth(true)
    }
  }, [])

  return (
    <>
      {!auth
        ? <Splash pass={pass} setPass={setPass} setAuth={setAuth} />
        : <main className="suite">
          <header><h1>Sweetie Suite</h1></header>
          <Calender />
          <Groceries />
          <Tasks />
          <Cats />
          <Plants />
        </main>
      }
    </>
  )
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

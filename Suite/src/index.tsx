import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { differenceInCalendarDays } from 'date-fns'

import Splash from './components/Splash'
import Suite from './components/Suite'

import './styles/index.scss'

function Index() {

  const [auth, setAuth] = useState<boolean>(false)
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const [pass, setPass] = useState<string>('')

  useEffect(() => {
    const passcode = process.env.REACT_APP_PASSCODE
    const democode = '0000'
    const ls = localStorage.getItem('Swt-Auth')
    if (ls) {
      const lsPass: { pass: string, auth: boolean, last: string } = JSON.parse(ls)
      const dif = Math.abs(differenceInCalendarDays(new Date(lsPass.last), new Date()))

      if (lsPass.pass !== democode && lsPass.pass !== passcode) return
      if (lsPass.pass !== democode && lsPass.pass === passcode) setReadOnly(false)
      if (lsPass.auth && dif <= 6) return setAuth(true)
    }
  }, [auth])

  if (auth)
    return <Suite readOnly={readOnly} />
  else
    return <Splash pass={pass} setPass={setPass} setAuth={setAuth} />
}

ReactDOM.render(<React.StrictMode><Index /></React.StrictMode>, document.getElementById('root'));

import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { routes } from 'routes'

import useDataFetch from 'Hooks/useDataFetch'
import useAppMode from 'Hooks/useAppMode'
import useAppTheme from 'Hooks/useAppTheme'

import Auth from 'Components/Auth/Auth'
import Page from 'Components/Page/Page'

import 'Styles/app.scss'

interface Props {
  socket: Socket
}

const App: React.FC<Props> = (props) => {
  const { socket } = props

  const navigate = useNavigate()

  const { loading, state } = useDataFetch(socket)
  const { setModeValue } = useAppMode()
  const { setThemeValues } = useAppTheme()

  const [auth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    if (auth) navigate('/overview')
  }, [auth])

  const routeProps = {
    socket,
    state,
    auth,
    setAuth,
    setModeValue,
    setThemeValues
  }

  const authProps = {
    auth,
    setAuth,
  }

  if (loading) return <></>

  if (!auth) return <Auth {...authProps} />

  return (
    <div id="App">
      <Routes>
        {routes.map((props) =>
          <Route
            key={props.path}
            path={props.path}
            element={<Page pageProps={routeProps} {...props} />} />
        )}
      </Routes>
    </div>
  )
}

export default App

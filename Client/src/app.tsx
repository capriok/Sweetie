import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom'
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
  const location = useLocation()

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
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Layout />}>
        {routes.map((props) =>
          <Route
            key={props.path}
            path={props.path}
            element={<Page props={routeProps} {...props} />} />
        )}
      </Route>
    </Routes>
  )
}

export default App

const Layout: React.FC<any> = () => {
  return (
    <div id="App">
      <Outlet />
    </div>
  )
}
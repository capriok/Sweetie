import React, { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import useDataFetch from 'Hooks/useDataFetch'
import useAppMode from 'Hooks/useAppMode'
import useAppTheme from 'Hooks/useAppTheme'

import Auth from 'Components/Auth/Auth'
import View from 'Components/View/View'

import 'Styles/app.scss'
import { routes } from 'routes'

interface Props {
  socket: Socket
}

const App: React.FC<Props> = (props) => {
  const { socket } = props

  const { loading, state } = useDataFetch(socket)
  const { setModeValue } = useAppMode()
  const { setThemeValues } = useAppTheme()

  const [auth, setAuth] = useState<boolean>(false)

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
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((props) =>
          <Route
            key={props.path}
            path={props.path}
            element={<View props={routeProps} {...props} />} />
        )}
      </Route>
    </Routes>
  )
}

export default App

const Layout = () => (
  <div id="App">
    <Outlet />
  </div>
)
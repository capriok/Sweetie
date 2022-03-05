import React, { createContext, useEffect, useState } from 'react'
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

interface Context {
  socket: Socket
  state: SwtState
  auth: boolean
  setAuth: React.Dispatch<boolean>
  setModeValue: (mode: any) => any
  setThemeValues: (theme: any) => any
}

export const AppContext = createContext<Partial<Context>>({})

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

  const context = {
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
    <AppContext.Provider value={context}>
      <div id="App">
        <Routes>
          {routes.map((routeProps) =>
            <Route
              key={routeProps.path}
              path={routeProps.path}
              element={<Page {...routeProps} />} />
          )}
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App

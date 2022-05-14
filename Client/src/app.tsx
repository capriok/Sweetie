import React, { createContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { routes } from 'routes'

import useDataFetch from 'Hooks/useDataFetch'
import useAppMode from 'Hooks/useAppMode'
import useAppTheme from 'Hooks/useAppTheme'

import { AiOutlineLoading } from 'react-icons/ai'
import Auth from 'Components/Auth/Auth'
import Page from 'Components/Page/Page'

import 'Styles/app.scss'
import { AnimatePresence } from 'framer-motion'
import PageAnimation from 'Components/Page/Animation'

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
  const location = useLocation()

  const { state } = useDataFetch(socket, location.pathname)
  const { setModeValue } = useAppMode()
  const { setThemeValues } = useAppTheme()

  const [auth, setAuth] = useState<boolean>(false)

  useEffect(() => {
    if (auth) navigate('/')
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

  if (!auth) return <Auth {...authProps} />

  return (
    <div id="App">
      <AppContext.Provider value={context}>
        <AnimatePresence>
          <Routes key={location.pathname} location={location}>
            {routes.map((props) =>
              <Route
                key={props.path}
                path={props.path}
                element={
                  <PageAnimation>
                    <Page {...props} />
                  </PageAnimation>
                }
              />
            )}
          </Routes>
        </AnimatePresence>
      </AppContext.Provider>
    </div>
  )
}

export default App

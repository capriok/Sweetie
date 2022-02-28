import React, { useState } from 'react'
import useAppMode from 'Hooks/useAppMode'
import useAppTheme from 'Hooks/useAppTheme'
import useDataFetch from './Hooks/useDataFetch'
import useSocket from './Hooks/useSocket'

import Secret from './Components/Auth/Secret'
import ViewMotion from './Components/View/Motion'
import View from './Components/View/View'
import Overview from './Views/Overview'
import Calendar from './Views/Calendar'
import CalendarPost from './Components/Forms/Calendar/Post'
import CalendarUpdate from './Components/Forms/Calendar/Update'
import CalendarDelete from './Components/Forms/Calendar/Delete'
import Grocery from './Views/Grocery'
import GroceryPost from './Components/Forms/Grocery/Post'
import GroceryDelete from './Components/Forms/Grocery/Delete'
import Cats from './Views/Cats'
import CatsUpdate from './Components/Forms/Cats/Update'
import Options from './Views/Options'

import 'Styles/app.scss'

const App: React.FC = () => {
  const { socket } = useSocket()
  const { loading, state, dispatch } = useDataFetch(socket)

  const [auth, setAuth] = useState<boolean>(false)
  const { setModeValue } = useAppMode()
  const { setThemeValues } = useAppTheme()

  const [component, setComponent] = useState<{ [key: string]: boolean }>({ overview: true })

  function dispatchView(value: string) {
    setComponent({ [value]: true })
  }

  const suiteProps = {
    socket,
    state,
    dispatch,
    dispatchView
  }

  const authProps = {
    auth,
    setAuth
  }

  const optionProps = {
    ...suiteProps,
    ...authProps,
    setModeValue,
    setThemeValues
  }

  const fromLeftVariants = {
    hidden: { opacity: 0, y: 0, x: -300 },
    visible: { opacity: 1, y: 0, x: 0 },
    exit: { opacity: 0, y: 0, x: -300 }
  }
  const fromRightVariants = {
    hidden: { opacity: 0, y: 0, x: 300 },
    visible: { opacity: 1, y: 0, x: 0 },
    exit: { opacity: 0, y: 0, x: 300 }
  }

  if (loading) return <></>

  if (!auth) return <Secret {...authProps} />

  return (
    <div id="App">
      <ViewMotion
        visible={component.overview}
        variants={fromLeftVariants}
        component={
          <View
            title="Overview"
            props={suiteProps}
            component={Overview}
            actions={[]}
          />
        } />
      <ViewMotion
        visible={component.calendar}
        variants={fromRightVariants}
        component={
          <View
            title="Calendar"
            props={suiteProps}
            component={Calendar}
            actions={[
              { type: 'post', component: CalendarPost },
              { type: 'update', component: CalendarUpdate },
              { type: 'delete', component: CalendarDelete }
            ]}
          />
        } />
      <ViewMotion
        visible={component.grocery}
        variants={fromRightVariants}
        component={
          <View
            title="Grocery"
            props={suiteProps}
            component={Grocery}
            actions={[
              { type: 'post', component: GroceryPost },
              { type: 'delete', component: GroceryDelete }
            ]}
          />
        } />
      <ViewMotion
        visible={component.cats}
        variants={fromRightVariants}
        component={
          <View
            title="Cats"
            props={suiteProps}
            component={Cats}
            actions={[
              { type: 'update', component: CatsUpdate }
            ]}
          />
        } />
      <ViewMotion
        visible={component.options}
        variants={fromRightVariants}
        component={
          <View
            title="Options"
            props={optionProps}
            component={Options}
            actions={[]}
          />
        } />
    </div>
  )
}

export default App
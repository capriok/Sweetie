import React from 'react'
import useDataFetch from './Hooks/useDataFetch'
import useSocket from './Hooks/useSocket'

import DatetimeModule from 'Components/Modules/Datetime'
import WeatherModule from 'Components/Modules/Weather'
import CalendarModule from 'Components/Modules/Calendar'
import CatsModule from 'Components/Modules/Cats'
import GroceryModule from 'Components/Modules/Grocery'

import 'Styles/app.scss'

const App: React.FC = () => {
  const { socket } = useSocket()
  const { loading, state, dispatch } = useDataFetch(socket)

  if (loading) return <></>

  const swtProps = {
    socket,
    state,
    dispatch
  }

  const modules = [
    DatetimeModule,
    CalendarModule,
    WeatherModule,
    CatsModule,
    GroceryModule
  ]

  return (
    <div id="App">
      {modules.map((Component, i) => (
        <div id="Module" key={i}>
          <Component {...swtProps} />
        </div>
      ))}
    </div>
  )
}


export default App
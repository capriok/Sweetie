import React, { useState, useEffect, useReducer } from 'react'
import useSocket from './Hooks/useSocket'
import { swtReducer, SwtReducerActions, swtState } from './state'

import Api from './api'

import DatetimeModule from 'Components/Modules/Datetime'
import WeatherModule from 'Components/Modules/Weather'
import CalendarModule from 'Components/Modules/Calendar'
import ScheduleModule from 'Components/Modules/Schedule'
import GroceryModule from 'Components/Modules/Grocery'

import 'Styles/app.scss'

const App: React.FC = () => {
  const { socket } = useSocket()

  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(swtReducer, swtState)

  useEffect(() => {
    setLoading(true)
    const requests = [
      { req: Api.GetCalendarEvents(), dispatch: SwtReducerActions.SETCE },
      { req: Api.GetGroceryList(), dispatch: SwtReducerActions.SETGL },
      { req: Api.GetCatSchedule(), dispatch: SwtReducerActions.SETCS }
    ]
    Promise.all(requests.map((req: any) => req.req))
      .then((responses) => {
        responses.forEach((res, i) => {
          console.log({ [requests[i].dispatch]: res })
          dispatch({ type: requests[i].dispatch, value: res })
        })
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    socket.on('calendar-update', (ce: Array<CalendarEvent>) => {
      console.log({ UpdatedCelendarEvents: ce })
      dispatch({ type: SwtReducerActions.SETCE, value: ce })
    })

    socket.on('grocery-update', (gl: Array<Grocery>) => {
      console.log({ UpdatedGroceryList: gl })
      dispatch({ type: SwtReducerActions.SETGL, value: gl })
    })

    socket.on('schedule-update', (today: CatScheduleDay) => {
      console.log({ UpdatedCatSchedule: today })
      dispatch({ type: SwtReducerActions.SETCS, value: today })
    })
  }, [socket])

  const modules = [
    DatetimeModule,
    CalendarModule,
    WeatherModule,
    ScheduleModule,
    GroceryModule
  ]

  if (loading) return <div id="App" />

  return (
    <div id="App">
      {modules.map((Component, i) => (
        <div id="Module" key={i}>
          <Component state={state} />
        </div>
      ))}
    </div>
  )
}


export default App
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
import NewYearModule from 'Components/Modules/NewYear'

const App: React.FC = () => {
  const { socket } = useSocket()

  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(swtReducer, swtState)

  const isMobile = window.innerWidth < 550

  useEffect(() => {
    setLoading(true)
    const requests = [
      { req: Api.GetCalendarWithEvents(), dispatch: SwtReducerActions.SETCALENDAR },
      { req: Api.GetGroceryList(), dispatch: SwtReducerActions.SETGROCERY },
      { req: Api.GetCatSchedule(), dispatch: SwtReducerActions.SETSCHEDULE }
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
    socket.on('calendar-update', (data: Array<CalendarDay>) => {
      console.log({ UpdatedCalendar: data })
      dispatch({ type: SwtReducerActions.SETCALENDAR, value: data })
    })

    socket.on('grocery-update', (data: Array<Grocery>) => {
      console.log({ UpdatedGrocery: data })
      dispatch({ type: SwtReducerActions.SETGROCERY, value: data })
    })

    socket.on('schedule-update', (data: ScheduleDay) => {
      console.log({ UpdatedSchedule: data })
      dispatch({ type: SwtReducerActions.SETSCHEDULE, value: data })
    })
  }, [])

  const modules = [
    DatetimeModule,
    CalendarModule,
    WeatherModule,
    ScheduleModule,
    // GroceryModule,
    NewYearModule
  ]

  if (loading) return <div id="App" />

  return (
    <div id="App">
      {modules.map((Component, i) => (
        <div id="Module" key={i}>
          <Component state={state} isMobile={isMobile} socket={socket} />
        </div>
      ))}
    </div>
  )
}

export default App

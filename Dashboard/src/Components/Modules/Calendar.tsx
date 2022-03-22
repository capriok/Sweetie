import React, { useEffect, useState } from 'react'

import 'Styles/modules/calendar.scss'

interface Props {
  state: SwtState
}

const CalendarModule: React.FC<Props> = (props) => {
  const { state } = props
  const [calendar, setCalendar] = useState<Array<CalendarDay>>([])

  useEffect(() => {
    setCalendar(state.calendar)
  }, [state.calendar])

  function dotClassName(event: CalendarEvent) {
    const cns = ['dot']

    if (event.name.includes('Work')) cns.push('work')
    if (event.name.includes('Payday')) cns.push('payday')

    return cns.join(' ')
  }

  return (
    <div className="calendar-module">
      <div className="module-cont">
        <div className="calendar-header">
          {weekdays.map((weekday, i) => (
            <div key={i} className="weekday">
              <p>{weekday}</p>
            </div>
          ))}
        </div>
        <div className="calendar-body">
          {calendar.map((day, i) => (
            <div key={i} className={day.classNames.day}>
              <p className={day.classNames.number}>{day.number}</p>
              <div className={day.classNames.number.includes('today') ? 'events' : 'dots'}>
                {day.events.map((event, i) =>
                  day.classNames.number.includes('today')
                    ? <div key={i} className="today-event">
                      {event.name}
                    </div>
                    : <div key={i} className={dotClassName(event)}>
                      •
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalendarModule

const weekdays = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

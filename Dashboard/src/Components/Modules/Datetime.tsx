import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import 'Styles/modules/datetime.scss'
import api from 'api'

interface Props {
  state: SwtState
  socket: Socket
}

const DatetimeModule: React.FC<Props> = (props) => {
  const { socket } = props
  const [today, setToday] = useState(new Date().getDate())
  const [currentSeconds, setCurrentSeconds] = useState(getSeconds())
  const [currentTime, setCurrentTime] = useState(getTime())
  const [currentDate, setCurrentDate] = useState(getDate())

  useEffect(() => {
    setTimeout(() => {
      setCurrentSeconds(getSeconds())
      setCurrentTime(getTime())
      setCurrentDate(getDate())
      setToday(getToday())


    }, 1000)
  }, [currentSeconds])

  function getSeconds() {
    return format(new Date(), 'pp')
  }

  function getTime() {
    return format(new Date(), 'p')
  }

  function getDate() {
    const day = format(new Date(), 'iii')
    const month = format(new Date(), 'LLLL')
    const date = format(new Date(), 'do')

    return `${day}, ${month} ${date}`
  }

  function getToday() {
    const day = new Date().getDate()
    if (day > today) {
      api.GetCalendarWithEvents().then(gl => {
        socket!.emit('calendar-change', gl)
      })
    }

    return day
  }

  return (
    <div className="datetime-module">
      <div className="module-cont">
        <div className="date">{currentDate}</div>
        <div className="time">{currentTime}</div>
      </div>
    </div>
  )
}

export default DatetimeModule

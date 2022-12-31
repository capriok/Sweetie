import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import 'Styles/modules/new-year.scss'

interface Props {
}

const NewYearModule: React.FC<Props> = () => {
  const [isNewYear, setNewYear] = useState(false)
  const [currentSeconds, setCurrentSeconds] = useState(getSeconds())

  useEffect(() => {
    setTimeout(() => {
      setCurrentSeconds(getSeconds())
      setNewYear(checkNewYear())


    }, 1000)
  }, [currentSeconds])

  function getSeconds() {
    return format(new Date(), 'pp')
  }

  const checkNewYear = () => {
    const month = new Date().getMonth()
    const day = new Date().getDate()

    if (month === 1 && day === 1) return true
    else return false
  }

  const greeting = "Happy New Year!"

  return (
    <div className="new-year-module">
      <div className="module-cont">
        <div className="yell">{greeting}</div>
      </div>
      {isNewYear && <>
        <div className="firework" />
        <div className="firework" />
        <div className="firework" />
        <div className="firework" />
        <div className="firework" />
      </>}
    </div>
  )
}

export default NewYearModule

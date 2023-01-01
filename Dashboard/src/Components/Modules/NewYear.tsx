import { useEffect, useState } from 'react'
import { format } from 'date-fns'

import 'Styles/modules/new-year.scss'

interface Props {
}

const NewYearModule: React.FC<Props> = () => {
  const [manualOverride, setManualOverride] = useState(false)
  const [isNewYear, setNewYear] = useState(false)
  const [currentSeconds, setCurrentSeconds] = useState(getSeconds())

  useEffect(() => {
    setTimeout(() => {
      setCurrentSeconds(getSeconds())
      setNewYear(checkNewYear())
    }, 1000)
  }, [currentSeconds])

  useEffect(() => {
    window.addEventListener('keypress', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 49) setManualOverride(true)
    if (event.keyCode === 50) setManualOverride(false)
  };

  function getSeconds() {
    return format(new Date(), 'pp')
  }

  const checkNewYear = () => {
    const month = new Date().getMonth()
    const day = new Date().getDate()

    if (manualOverride) return true

    if (month === 1 && day === 1) return true
    else return false
  }

  const greeting = isNewYear
    ? "Happy New Year!"
    : <>
      <div>For last years words belong to last years language</div>
      <div>and next years words await another voice.</div>
    </>

  return (
    <div className="new-year-module">
      <div className="module-cont">
        <div className="yell">{greeting}</div>
      </div>
      {isNewYear && <>
        <div className="firework" />
        <div className="firework" />
      </>}
    </div>
  )
}

export default NewYearModule

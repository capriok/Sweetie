import { useEffect, useState } from 'react'
import { ProgressBar, BarOptions } from 'progresses'

import 'Styles/modules/schedule.scss'

interface Props {
  state: SwtState
  isMobile: boolean
}

const ScheduleModule: React.FC<Props> = (props) => {
  const { state, isMobile } = props

  const [foodProgress, setFoodProgress] = useState(0)
  const [wasteProgress, setWasteProgress] = useState(0)
  // const [floorProgress, setFloorProgress] = useState(0)

  useEffect(() => {
    if (state.schedules) {
      setFoodProgress(state.schedules.food.progress)
      setWasteProgress(state.schedules.waste.progress)
      // setFloorProgress(state.schedules.floor.progress)
    }
  }, [state.schedules])

  const progressOptions: BarOptions = {
    height: isMobile ? 8 : 175,
    width: isMobile ? 75 : 325,
    orientation: isMobile ? 'horizontal' : 'vertical',
    showPercent: false,
    colors: {
      back: 'rgba(0, 0, 0, 0.4)',
      fill: 'rgba(200, 200, 200, 0.4)',
      anim: 'rgba(200, 10, 10, 0.4)'
    }
  }

  return (
    <div className="schedule-module">
      <div className="module-cont">
        <div className="schedule">
          <p className="schedule-title _module-title">Food</p>
          <ProgressBar percent={foodProgress} options={progressOptions} />
        </div>
        <div className="schedule">
          <p className="schedule-title _module-title">Waste</p>
          <ProgressBar percent={wasteProgress} options={progressOptions} />
        </div>
        {/* <div className="schedule">
          <p className="schedule-title _module-title">?</p>
          <ProgressBar percent={floorProgress} options={progressOptions} />
        </div> */}
      </div>
    </div>
  )
}

export default ScheduleModule

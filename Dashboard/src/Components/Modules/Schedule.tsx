import { useEffect, useState } from 'react'

import Progress from 'Components/Common/Progress'

import 'Styles/modules/schedule.scss'

interface Props {
  state: SwtState
}

const ScheduleModule: React.FC<Props> = (props) => {
  const { state } = props

  const [foodProgress, setFoodProgress] = useState(0)
  const [wasteProgress, setWasteProgress] = useState(0)
  const [floorProgress, setFloorProgress] = useState(0)

  useEffect(() => {
    if (state.schedules) {
      setFoodProgress(state.schedules.food.progress)
      setWasteProgress(state.schedules.waste.progress)
      setFloorProgress(state.schedules.floor.progress)
    }
  }, [state.schedules])

  return (
    <div className="schedule-module">
      <div className="module-cont">
        <div className="schedule">
          <p className="schedule-title _module-title">Food</p>
          <Progress progress={foodProgress} />
        </div>
        <div className="schedule">
          <p className="schedule-title _module-title">Waste</p>
          <Progress progress={wasteProgress} />
        </div>
        <div className="schedule">
          <p className="schedule-title _module-title">Floor</p>
          <Progress progress={floorProgress} />
        </div>
      </div>
    </div>
  )
}

export default ScheduleModule

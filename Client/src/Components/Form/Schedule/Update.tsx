import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Api from 'api'

import 'Styles/components/form/form.scss'

interface Props {
	socket: Socket
	state: SwtState
}

const INITIAL_FORM = {
	foodDay: new Date().toJSON().split('T')[0],
	wasteDay: new Date().toJSON().split('T')[0],
	floorDay: new Date().toJSON().split('T')[0]
}

const ScheduleUpdate: React.FC<Props> = (props) => {
	const { socket } = props

	const navigate = useNavigate()

	const [schedulesConfig, setSchedulesConfig] = useState<any>({})
	const [form, setForm] = useState<any>(INITIAL_FORM)

	useEffect(() => {
		Api.GetSchedulesConfig().then((sc) => {
			console.log(sc)
			setSchedulesConfig({
				lastFoodDay: sc.lastFoodDay,
				lastWasteDay: sc.lastWasteDay,
				lastFloorDay: sc.lastFloorDay
			})
		})
	}, [])

	useEffect(() => {
		if (!schedulesConfig.lastFoodDay ||
			!schedulesConfig.lastWasteDay ||
			!schedulesConfig.lastFloorDay) return
		setForm({
			foodDay: schedulesConfig.lastFoodDay,
			wasteDay: schedulesConfig.lastWasteDay,
			floorDay: schedulesConfig.lastFloorDay
		})
	}, [schedulesConfig])

	async function submit(e: any) {
		e.preventDefault()

		const lastFoodDay = new Date(form.foodDay!)
		const lastWasteDay = new Date(form.wasteDay!)
		const lastFloorDay = new Date(form.floorDay!)

		let config = {
			lastFoodDay: lastFoodDay.toJSON(),
			lastWasteDay: lastWasteDay.toJSON(),
			lastFloorDay: lastFloorDay.toJSON()
		}

		console.log('Updating', config)
		Api.UpdateSchedulesConfig(config).then(sc => {
			setSchedulesConfig(sc)
			Api.GetSchedules().then(schedules => {
				socket.emit('schedule-change', schedules)
				navigate(-1)
			})
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Update</div>
				<form onSubmit={(e) => submit(e)}>
					<div className="line-title">Cats</div>
					<div className="form-line food">
						<label>Food Day</label>
						<input
							type="date"
							max={new Date().toJSON().split('T')[0]}
							value={new Date(form.foodDay).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, foodDay: e.target.value })} />
					</div>
					<div className="form-line waste">
						<label>Waste Day</label>
						<input
							type="date"
							max={new Date().toJSON().split('T')[0]}
							value={new Date(form.wasteDay).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, wasteDay: e.target.value })} />
					</div>
					<div className="line-title">House</div>
					<div className="form-line floor">
						<label>Floor Day</label>
						<input
							type="date"
							max={new Date().toJSON().split('T')[0]}
							value={new Date(form.floorDay).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, floorDay: e.target.value })}
						/>
					</div>
					<div className="form-submit">
						<button className="submit" type="submit">Submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ScheduleUpdate
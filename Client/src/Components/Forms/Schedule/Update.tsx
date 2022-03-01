import React, { useEffect, useState } from 'react'
import Api from 'api'

import 'Styles/components/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	closeForm: () => React.Dispatch<any>
}

const INITIAL_FORM = {
	lfd: new Date().toJSON().split('T')[0],
	lwd: new Date().toJSON().split('T')[0]
}

const ScheduleUpdate: React.FC<Props> = (props) => {
	const { socket, closeForm } = props

	const [catConfig, setCatConfig] = useState<any>({})
	const [form, setForm] = useState<any>(INITIAL_FORM)

	useEffect(() => {
		Api.GetCatConfig().then((cc) => {
			setCatConfig({
				lastFoodDay: cc.lastFoodDay,
				lastWasteDay: cc.lastWasteDay
			})
		})
	}, [])

	useEffect(() => {
		if (!catConfig.lastFoodDay || !catConfig.lastWasteDay) return
		setForm({
			lfd: catConfig.lastFoodDay,
			lwd: catConfig.lastWasteDay
		})
	}, [catConfig])

	async function submit(e: any) {
		e.preventDefault()

		const lastFoodDay = new Date(form.lfd!)
		const lastWasteDay = new Date(form.lwd!)

		let config = {
			lastFoodDay: lastFoodDay.toJSON(),
			lastWasteDay: lastWasteDay.toJSON()
		}

		console.log('Updating', config)
		Api.UpdateCatConfig(config).then(cc => {
			setCatConfig(cc)
			Api.GetCatSchedule().then(today => {
				socket.emit('schedule-change', today)
				closeForm()
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
							value={new Date(form.lfd).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, lfd: e.target.value })} />
					</div>
					<div className="form-line waste">
						<label>Waste Day</label>
						<input
							type="date"
							max={new Date().toJSON().split('T')[0]}
							value={new Date(form.lwd).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, lwd: e.target.value })} />
					</div>
					<div className="line-title">House</div>
					<div className="form-line floor">
						<label>Floor Day</label>
						<input
							type="date"
							max={new Date().toJSON().split('T')[0]}
							value={new Date(form.lwd).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, flr: e.target.value })}
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
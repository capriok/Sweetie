import React, { useEffect, useState } from 'react'
import { startOfToday } from 'date-fns'
import Api from 'api'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const INITIAL_FORM = {
	lfd: new Date().toISOString().split('T')[0],
	lwd: new Date().toISOString().split('T')[0]
}

const CatsUpdate: React.FC<Props> = (props) => {
	const { socket, dispatch } = props

	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const maxDate = new Date(date).toISOString().split('T')[0]

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
				socket.emit('cs-change', today)
				dispatch({ type: SwtReducerActions.SETCS, value: today })
			})
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Update</div>
				<form onSubmit={(e) => submit(e)} className="cats">
					<div className="form-line food">
						<label htmlFor="food">Food Day</label>
						<input
							type="date"
							max={maxDate}
							value={new Date(form.lfd).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, lfd: e.target.value })} />
					</div>
					<div className="form-line waste">
						<label htmlFor="waste">Litter Change</label>
						<input
							type="date"
							max={maxDate}
							value={new Date(form.lwd).toISOString().split('T')[0]}
							onChange={(e) => setForm({ ...form, lwd: e.target.value })} />
					</div>
					<div className="form-submit">
						<button className="submit" type="submit">Submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CatsUpdate
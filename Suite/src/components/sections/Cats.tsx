import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { isAfter, isSameDay, startOfDay, startOfToday } from 'date-fns'

import Api from '../../api'
import Modal from '../Modal'
import '../../styles/sections/cats.scss'

import { MdSystemUpdateAlt } from 'react-icons/md'
import { addDays } from 'date-fns/esm'

const Cats: React.FC = () => {
	const [updating, setUpdating] = useState(false)
	const [schedule, setSchedule] = useState<Array<CatScheduleDay>>([])
	const [catConfig, setCatConfig] = useState<CatConfig>({
		lastFoodDay: undefined,
		lastWasteDay: undefined
	})
	const [lfd, setLfd] = useState<any>()
	const [lwd, setLwd] = useState<any>()

	function ResetUpdateFormState() {
		setUpdating(false)
		setLfd(lfd)
		setLwd(lwd)
	}

	const outClickRef = useRef()
	useOutsideClick(outClickRef, () => {
		if (!updating) return
		ResetUpdateFormState()
	})

	async function updateConfig(e: any) {
		e.preventDefault()

		const foodSame = isSameDay(
			new Date(catConfig.lastFoodDay!),
			new Date(lfd)
		)
		const wasteSame = isSameDay(
			new Date(catConfig.lastWasteDay!),
			new Date(lwd)
		)
		const foodInFuture = isAfter(new Date(lfd), startOfToday())
		const wasteInFuture = isAfter(new Date(lwd), startOfToday())

		if (foodSame && wasteSame) return

		const lastFoodDay = new Date(lfd).toJSON()
		const lastWasteDay = new Date(lwd).toJSON()
		console.log(catConfig);


		let config: any = {}
		if (!foodSame && !foodInFuture) config.lastFoodDay = lastFoodDay
		if (!wasteSame && !wasteInFuture) config.lastWasteDay = lastWasteDay

		console.log(config)

		Api.UpdateCatConfig(config).then(cd => {
			setCatConfig(cd)
			ResetUpdateFormState()
		})
	}

	useEffect(() => {
		(async () => Api.GetCatConfig().then(cc => {
			setLfd(cc.lastFoodDay)
			setLwd(cc.lastWasteDay)
			console.log({ CatConfig: cc })
			setCatConfig(cc)
		}))()
	}, [])

	useEffect(() => {
		if (!catConfig.lastFoodDay || !catConfig.lastWasteDay) return
		(async () => Api.GetCatSchedule().then(cs => {
			console.log({ CatSchedule: cs })
			setSchedule(cs)
		}))()
	}, [catConfig])

	return (
		<>
			<section>
				<div className="content cats">
					<div className="head">
						<p>Day</p>
						<p>Food</p>
						<p>Waste</p>
					</div>
					{schedule.map((day, i) => (
						<div className="item" key={i}>
							<div className="day">
								<p>{new Date(day.date).toLocaleDateString('en-us',
									{ weekday: 'short', month: 'short', day: 'numeric' })}</p>
							</div>
							<div className="food">
								<input readOnly type="radio" checked={day.food.is} />
							</div>
							<div className="waste">
								<input readOnly type="radio" checked={day.waste.is} />
							</div>
						</div>
					))}

				</div>
				<div className="action-btns">
					<button onClick={() => setUpdating(!updating)}><MdSystemUpdateAlt /></button>
				</div>
			</section>
			{updating &&
				<Modal
					title="Cat Config"
					smref={outClickRef}
					close={() => ResetUpdateFormState()}>
					<form onSubmit={(e) => updateConfig(e)} className="cats">
						<div className="config">
							<label>
								<p>Last Food Day</p>
								<input
									type="date"
									max={new Date(startOfToday()).toISOString().split('T')[0]}
									value={new Date(lfd).toISOString().split('T')[0]}
									onChange={(e) => setLfd(addDays(startOfDay(new Date(e.target.value)), 1))} />
							</label>
							<label>
								<p>Last Waste Day</p>
								<input
									type="date"
									max={new Date(startOfToday()).toISOString().split('T')[0]}
									value={new Date(lwd).toISOString().split('T')[0]}
									onChange={(e) => setLwd(addDays(startOfDay(new Date(e.target.value)), 1))} />
							</label>
						</div>
						<button className="submit" type="submit">Submit</button>
					</form>
				</Modal>
			}
		</>
	)
}

export default Cats
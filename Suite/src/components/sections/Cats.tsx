import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { isAfter, isSameDay, startOfToday } from 'date-fns'

import Api from '../../api'
import Modal from '../Modal'
import CatsUpdating from '../modals/Cats-Updating'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../styles/sections/cats.scss'

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
			<div className="section-scroll">
				<div className="content cats">
					<div className="content-head">
						<p>Day</p>
						<p>Food</p>
						<p>Waste</p>
					</div>
					{schedule.map((day, i) => (
						<div className="content-line with-border" key={i}>
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
			</div>

			<ActionBar actives={[[updating, () => setUpdating(!updating)]]}>
				<ActionBarButton click={() => setUpdating(!updating)} render={<MdSystemUpdateAlt />} />
			</ActionBar>

			{updating &&
				<Modal
					title="Cat Config"
					mref={outClickRef}>
					<CatsUpdating
						submit={updateConfig}
						lfd={lfd}
						setLfd={setLfd}
						lwd={lwd}
						setLwd={setLwd}
					/>
				</Modal>
			}
		</>
	)
}

export default Cats
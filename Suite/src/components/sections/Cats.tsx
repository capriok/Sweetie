import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { isSameDay } from 'date-fns'

import Api from '../../api'
import Modal from '../Modal'
import CatsUpdating from '../modals/Cats-Updating'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../styles/sections/cats.scss'

const Cats: React.FC<any> = ({ readOnly }) => {
	const [updating, setUpdating] = useState(false)
	const [schedule, setSchedule] = useState<Array<CatScheduleDay>>([])
	const [catConfig, setCatConfig] = useState<CatConfig>({
		lastFoodDay: '',
		lastWasteDay: ''
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

		const lastFoodDay = new Date(lfd)
		const lastWasteDay = new Date(lwd)

		const foodSame = isSameDay(new Date(catConfig.lastFoodDay!), lastFoodDay)
		const wasteSame = isSameDay(new Date(catConfig.lastWasteDay!), lastWasteDay)

		if (foodSame && wasteSame) return

		let config: any = {}
		if (!foodSame) config.lastFoodDay = lastFoodDay.toJSON()
		if (!wasteSame) config.lastWasteDay = lastWasteDay.toJSON()

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(config)
		Api.UpdateCatConfig(config).then(cd => {
			ResetUpdateFormState()
			setCatConfig(cd)
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
			setSchedule(cs.map(d => {
				d.date = tzFormat(d.date)
				return d
			}))
		}))()
	}, [catConfig])

	function tzFormat(date: string) {
		const tzDate = new Date(date)
		tzDate.setMinutes(tzDate.getMinutes() + tzDate.getTimezoneOffset())
		return tzDate.toJSON()
	}

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
									{ weekday: 'short', month: 'short', day: 'numeric' })}
								</p>
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

			<ActionBar actives={[
				{ is: updating, cb: () => setUpdating(!updating) }
			]}>
				<ActionBarButton click={() => setUpdating(!updating)} render={<MdSystemUpdateAlt />} />
			</ActionBar>

			{updating &&
				<Modal
					title="Cats"
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
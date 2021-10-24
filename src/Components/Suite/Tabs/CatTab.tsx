import React, { useEffect, useState } from 'react'

import Api from '../../../api'
import Form from '../Form'
import CatsForm from '../Forms/CatsForm'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../../Styles/Suite/Tabs/cat-tab.scss'

interface FormState {
	lfd?: string
	lwd?: string
}

const InitUpdatingForm: FormState = {
	lfd: undefined,
	lwd: undefined
}


const CatTab: React.FC<any> = ({ readOnly }) => {
	const [isUpdating, setUpdating] = useState(false)

	const [schedule, setSchedule] = useState<Array<CatScheduleDay>>([])
	const [catConfig, setCatConfig] = useState<CatConfig>({
		lastFoodDay: '',
		lastWasteDay: ''
	})

	const [updatingForm, setUpdatingForm] = useState(InitUpdatingForm)

	const toggleUpdating = () => setUpdating(s => !s)

	function resetUpdatingState() {
		setUpdating(false)
	}

	function setUpdatingConfig(catConfig: CatConfig) {
		setUpdatingForm({
			lfd: catConfig.lastFoodDay,
			lwd: catConfig.lastWasteDay
		})
	}

	async function UpdateConfig(e: any) {
		e.preventDefault()

		const lastFoodDay = new Date(updatingForm.lfd!)
		const lastWasteDay = new Date(updatingForm.lwd!)

		let config = {
			lastFoodDay: lastFoodDay.toJSON(),
			lastWasteDay: lastWasteDay.toJSON()
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(config)
		Api.UpdateCatConfig(config).then(cc => {
			resetUpdatingState()
			setCatConfig(cc)
		})
	}

	useEffect(() => {
		(async () => Api.GetCatConfig().then(cc => {
			console.log({ CatConfig: cc })
			setCatConfig(cc)
		}))()
	}, [])

	useEffect(() => {
		if (!catConfig.lastFoodDay || !catConfig.lastWasteDay) return
		(async () => Api.GetCatSchedule().then(({ today, cs }) => {
			console.log({ CatSchedule: cs })
			setSchedule(cs)
		}))()
		setUpdatingConfig(catConfig)
	}, [catConfig])

	return (
		<>
			<div className="section-scroll">
				{(() => {

					if (isUpdating) return (
						<Form title="Cats">
							<CatsForm
								submit={UpdateConfig}
								form={updatingForm}
								setForm={setUpdatingForm}
							/>
						</Form>
					)

					return (
						<div className="cat-tab content">
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
										<input tabIndex={-1} readOnly type="radio" checked={day.food.is} />
									</div>
									<div className="waste">
										<input tabIndex={-1} readOnly type="radio" checked={day.waste.is} />
									</div>
								</div>
							))}
						</div>
					)
				})()}
			</div>

			<ActionBar>
				<ActionBarButton
					is={isUpdating}
					click={toggleUpdating}
					cancel={resetUpdatingState}
					render={<MdSystemUpdateAlt />} />
			</ActionBar>
		</>
	)
}

export default CatTab
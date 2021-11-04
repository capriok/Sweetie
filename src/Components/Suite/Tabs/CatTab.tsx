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

const CatTab: React.FC<any> = ({ props }) => {
	const { state, dispatch, readOnly } = props

	const [catConfig, setCatConfig] = useState<any>({})

	const [isUpdating, setUpdating] = useState(false)
	const [updatingForm, setUpdatingForm] = useState(InitUpdatingForm)
	const [foodProgress, setFoodProgress] = useState(0)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [wastePercent, setWastePercent] = useState(0)

	const toggleUpdating = () => setUpdating(s => !s)

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
		setUpdatingForm({
			lfd: catConfig.lastFoodDay,
			lwd: catConfig.lastWasteDay
		})
	}, [catConfig])

	useEffect(() => {
		if (!state.catSchedule.date) return
		setFoodProgress(state.catSchedule.food.progress)
		setWasteProgress(state.catSchedule.waste.progress)
	}, [state.catSchedule])

	useEffect(() => {
		calculateCircleProgress(circleProps.r, foodProgress, setFoodPercent)
		calculateCircleProgress(circleProps.r, wasteProgress, setWastePercent)
	}, [foodProgress, wasteProgress])

	function calculateCircleProgress(r: number, progress: number, setter: any) {
		var c = Math.PI * (r * 2)
		var pct = ((100 - progress) / 100) * c
		setter(pct)
	}

	function resetUpdatingState() {
		setUpdating(false)
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

		console.log('Updating', config)
		Api.UpdateCatConfig(config).then(cc => {
			setCatConfig(cc)
			Api.GetCatSchedule().then(today => {
				dispatch({ type: 'CatSchedule', value: today })
			})
			resetUpdatingState()
		})
	}

	return (
		<>
			<div className="section-scroll">
				{(() => {

					if (isUpdating) return (
						<Form title="Modify">
							<CatsForm
								submit={UpdateConfig}
								form={updatingForm}
								setForm={setUpdatingForm}
							/>
						</Form>
					)

					return (
						<div className="cat-tab content">
							<div className="content-line">
								<p>Food</p>
								<ProgressCircle progress={foodProgress} percent={foodPercent} />
							</div>
							<div className="content-line">
								<p>Waste</p>
								<ProgressCircle progress={wasteProgress} percent={wastePercent} />
							</div>
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


function animate(prop: number) {
	return prop === 100
		? 'ease-in-out 5s infinite alternate tab-glow'
		: 'unset'
}

const circleProps = {
	r: 42.5,
	cx: 50,
	cy: 50,
	fill: 'transparent',
	strokeDasharray: '268',
	strokeDashoffset: '0'
}

const ProgressCircle: React.FC<any> = ({ progress, percent }) => {

	return (
		<div id="cont" style={{ animation: animate(progress) }}>
			<svg id="svg" width="100" height="100">
				<circle {...circleProps} />
				<circle
					id="bar"
					{...circleProps}
					style={{ strokeDashoffset: percent }} />
			</svg>
		</div>
	)
}

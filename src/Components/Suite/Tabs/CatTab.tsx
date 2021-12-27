import React, { useEffect, useState } from 'react'
import { SwtReducerActions } from '../../../state'

import Api from '../../../api'
import Form from '../../Suite/Components/Form'
import CatsForm from '../Forms/CatsForm'
import ActionBar, { ActionBarButton } from '../../Suite/Components/ActionBar'
import ProgressCircle from '../../Shared/ProgressCircle'

import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../../Styles/Suite/Tabs/Cat-tab.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

interface FormState {
	lfd?: string
	lwd?: string
}

const InitUpdatingForm: FormState = {
	lfd: undefined,
	lwd: undefined
}

const CatTab: React.FC<Props> = (props) => {
	const { socket, state, dispatch } = props

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

		console.log('Updating', config)
		Api.UpdateCatConfig(config).then(cc => {
			setCatConfig(cc)
			Api.GetCatSchedule().then(today => {
				socket.emit('cs-change', today)
				dispatch({ type: SwtReducerActions.SETCS, value: today })
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
								<ProgressCircle
									{...circleProps}
									progress={foodProgress}
									percent={foodPercent} />
								<p>Food</p>
							</div>
							<div className="content-line">
								<ProgressCircle
									{...circleProps}
									progress={wasteProgress}
									percent={wastePercent} />
								<p>Waste</p>
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

const circleProps = {
	h: 100,
	w: 100,
	r: 30,
	cx: 50,
	cy: 50,
	strokeDasharray: '189'
}

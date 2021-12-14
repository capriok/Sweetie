import React, { useEffect, useState } from 'react'

import Api from '../../../api'
import Form from '../Form'
import GroceryForm from '../Forms/GroceryForm'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

import '../../../Styles/Suite/Tabs/grocery-tab.scss'

interface FormState {
	name: string
	quantity: number
	type: string
}

const InitAddingForm: FormState = {
	name: '',
	quantity: 1,
	type: 'grocery',
}

const GroceryTab: React.FC<any> = ({ props }) => {
	const { state, dispatch } = props

	const [isAdding, setAddingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	const [addingForm, setAddingForm] = useState(InitAddingForm)

	const toggleAdding = () => setAddingState(s => !s)
	const toggleRemoving = () => setRemovingState(s => !s)

	useEffect(() => {
		setGroceryList(state.groceryList)
	}, [state.groceryList])

	function resetAddingState() {
		setAddingForm({ ...InitAddingForm, type: addingForm.type })
		setAddingState(false)
	}

	function toggleClear() {
		const confirmation = window.confirm(
			'Are you sure you got everything?\n\n'
		);
		if (confirmation) {
			Api.ClearGroceryList().then(gl => {
				dispatch({ type: 'GroceryList', value: gl })
			})
		}
	}

	function removeGrocery(item: Grocery) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${item.name}' ?`);
		if (confirmation) {
			Api.RemoveGrocery(item).then(gl => {
				dispatch({ type: 'GroceryList', value: gl })
			})
		}
	}

	function postGrocery(e: any) {
		e.preventDefault()
		if (!isAdding || !addingForm.name) return

		let item = {
			name: addingForm.name,
			qty: addingForm.quantity,
			type: addingForm.type
		}

		console.log(item);
		Api.PostGrocery(item).then(gl => {
			resetAddingState()
			dispatch({ type: 'GroceryList', value: gl })
		})
	}

	return (
		<>
			<div className="section-scroll">
				{(() => {

					if (isAdding) return (
						<Form title="Add Grocery">
							<GroceryForm
								submit={postGrocery}
								form={addingForm}
								setForm={setAddingForm} />
						</Form>
					)

					if (!groceryList.length) return (
						<div className="content-empty"><p>Nothing here.</p></div>
					)

					return (
						<div className="grocery-tab content">
							{groceryList.some(g => g.type === 'grocery') &&
								<>
									<h3>Grocery</h3>
									{groceryList.filter(i => i.type === 'grocery').map((item, i) => (
										<div
											key={i}
											className="content-line with-border"
											onClick={() => removeGrocery(item)}>
											<p className="name">{item.name}</p>
											<p className="quantity">{item.qty}</p>
										</div>
									))}
								</>
							}
							{groceryList.some(g => g.type === 'other') &&
								<>
									<h3>Other</h3>
									{groceryList.filter(i => i.type === 'other').map((item, i) => (
										<div
											key={i}
											className="content-line with-border"
											onClick={() => removeGrocery(item)}>
											<p className="name">{item.name}</p>
											<p className="quantity">{item.qty}</p>
										</div>
									))}
								</>
							}
						</div>
					)
				})()}
			</div>

			<ActionBar>
				<ActionBarButton
					is={isAdding}
					click={toggleAdding}
					cancel={resetAddingState}
					render={<VscDiffAdded />} />
				<ActionBarButton
					is={isRemoving}
					click={toggleRemoving}
					cancel={toggleRemoving}
					render={<VscDiffRemoved />} />
				<ActionBarButton
					click={toggleClear}
					render={<VscDebugStop />} />
			</ActionBar>
		</>
	)
}

export default GroceryTab


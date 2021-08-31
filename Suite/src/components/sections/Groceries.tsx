import React, { useEffect, useState } from 'react'

import Api from '../../api'
import Form from '../Form'
import Groceryform from '../forms/GroceryForm'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

import '../../styles/sections/groceries.scss'

interface FormState {
	name: string
	quantity: number
	store: string
}

const InitAddingForm: FormState = {
	name: '',
	quantity: 1,
	store: 'wholefoods',
}

const Groceries: React.FC<any> = ({ readOnly }) => {
	const [isAdding, setAddingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	const [addingForm, setAddingForm] = useState(InitAddingForm)

	const toggleAdding = () => setAddingState(s => !s)
	const toggleRemoving = () => setRemovingState(s => !s)

	function resetAddingState() {
		setAddingForm({ ...InitAddingForm, store: addingForm.store })
		setAddingState(false)
	}

	function toggleClear() {
		const confirmation = window.prompt(
			'Are you sure you got everything?\n\n' +
			'Type \'confirm\' to clear Groceries.'
		);
		if (confirmation?.toLocaleLowerCase() === 'confirm') {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.ClearGroceryList().then(gl => setGroceryList(gl))
		}
	}

	async function removeGrocery(item: Grocery) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${item.name}' ?`);
		if (confirmation) {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.RemoveGrocery(item).then(gl => setGroceryList(gl))
		}
	}

	async function postGrocery(e: any) {
		e.preventDefault()
		if (!isAdding || !addingForm.name) return

		let item = {
			name: addingForm.name,
			qty: addingForm.quantity,
			store: addingForm.store
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(item);
		Api.PostGrocery(item).then(gl => {
			resetAddingState()
			setGroceryList(gl)
		})
	}

	useEffect(() => {
		(async () => Api.GetGroceryList().then(gl => {
			console.log({ Groceries: gl })
			setGroceryList(gl)
		}))()
	}, [])

	return (
		<>
			<div className="section-scroll">
				{(() => {

					if (isAdding) return (
						<Form title="Add Grocery">
							<Groceryform
								submit={postGrocery}
								form={addingForm}
								setForm={addingForm} />
						</Form>
					)

					if (!groceryList.length) return (
						<div className="content-empty"><p>Nothing here.</p></div>
					)

					return (
						<div className="groceries content">
							{groceryList.some(g => g.store === 'wholefoods') &&
								<>
									<h3>Whole Foods</h3>
									{groceryList.filter(i => i.store === 'wholefoods').map((item, i) => (
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
							{groceryList.some(g => g.store === 'bashas') &&
								<>
									<h3>Bashas</h3>
									{groceryList.filter(i => i.store === 'bashas').map((item, i) => (
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

export default Groceries


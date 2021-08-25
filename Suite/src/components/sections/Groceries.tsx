import React, { useEffect, useState, useRef } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'

import Api from '../../api'
import Modal from '../Modal'
import GroceryAdding from '../modals/Grocery-Adding'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

import '../../styles/sections/groceries.scss'

const Groceries: React.FC<any> = ({ readOnly }) => {
	const [isAdding, setAddingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	const [name, setName] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [store, setStore] = useState('wholefoods')

	function ResetStates() {
		setAddingState(false)
		setRemovingState(false)
	}
	const ToggleAdding = () => setAddingState(s => !s)
	const ToggleRemoving = () => setRemovingState(s => !s)

	function ResetAddFormState() {
		setName('')
		setQuantity(1)
		setAddingState(false)
	}

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!isAdding && !isRemoving) return
		ResetStates()
		ResetAddFormState()
	})

	function ToggleClear() {
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
		if (!isAdding || !name) return

		let item = { name: name, qty: quantity, store: store }

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(item);
		Api.PostGrocery(item).then(gl => {
			ResetAddFormState()
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
			<div className="section-scroll" ref={outClickRef}>
				{!groceryList.length
					? <div className="content-empty"><p>Nothing here.</p></div>
					: <div className="groceries content">
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
				}
			</div>

			<ActionBar actives={[
				{ is: isAdding, cb: ToggleAdding },
				{ is: isRemoving, cb: ToggleRemoving }
			]}>
				<ActionBarButton click={ToggleAdding} render={<VscDiffAdded />} />
				<ActionBarButton click={ToggleRemoving} render={<VscDiffRemoved />} />
				<ActionBarButton click={ToggleClear} render={<VscDebugStop />} />
			</ActionBar>

			{isAdding &&
				<Modal
					title="Add Grocery"
					mref={outClickRef}>
					<GroceryAdding
						submit={postGrocery}
						name={name}
						setName={setName}
						quantity={quantity}
						setQuantity={setQuantity}
						store={store}
						setStore={setStore} />
				</Modal>
			}
		</>
	)
}

export default Groceries


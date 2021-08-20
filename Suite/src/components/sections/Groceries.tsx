import React, { useEffect, useState, useRef } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'

import Api from '../../api'
import Modal from '../Modal'
import GroceryAdding from '../modals/Grocery-Adding'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

import '../../styles/sections/groceries.scss'

const Groceries: React.FC = () => {
	const [is, set] = useState({
		adding: false,
		removing: false
	})

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])
	const [name, setName] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [store, setStore] = useState('wholefoods')

	function ResetSetState() {
		set(() => ({ adding: false, removing: false }))
	}

	function ResetAddFormState() {
		setName('')
		setQuantity(1)
		setStore('wholefoods')
	}

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!is.adding && !is.removing) return
		ResetSetState()
		ResetAddFormState()
	})

	function AddBtnClick() {
		set(is => ({ ...is, adding: !is.adding }))
	}

	function RemoveBtnClick() {
		set(is => ({ ...is, removing: !is.removing }))
	}

	function ClearBtnClick() {
		const confirmation = window.prompt(
			'Are you sure you got everything?\n\n' +
			'Type \'confirm\' to clear Groceries.'
		);
		if (confirmation?.toLocaleLowerCase() === 'confirm') {
			Api.ClearGroceryList().then(gl => setGroceryList(gl))
		}
	}

	async function removeGrocery(item: Grocery) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove '${item.name}' ?`);
		if (confirmation) {
			Api.RemoveGrocery(item).then(gl => setGroceryList(gl))
		}
	}

	async function postGrocery(e: any) {
		e.preventDefault()
		if (!is.adding || !name) return

		let item = { name: name, qty: quantity, store: store }

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
					? <div className="content-empty" >Nothing here.</div>
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
				[is.adding, AddBtnClick],
				[is.removing, RemoveBtnClick]
			]}>
				<ActionBarButton click={AddBtnClick} render={<VscDiffAdded />} />
				<ActionBarButton click={RemoveBtnClick} render={<VscDiffRemoved />} />
				<ActionBarButton click={ClearBtnClick} render={<VscDebugStop />} />
			</ActionBar>

			{is.adding &&
				<Modal
					title="Add Grocery"
					mref={outClickRef}>
					<GroceryAdding
						submit={postGrocery}
						setName={setName}
						quantity={quantity}
						setQuantity={setQuantity}
						setStore={setStore} />
				</Modal>
			}
		</>
	)
}

export default Groceries


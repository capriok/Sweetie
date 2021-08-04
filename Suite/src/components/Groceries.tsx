import React, { useEffect, useState, useRef } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import short from 'short-uuid'

import Api from '../api'
import SlideModal from './SlideModal'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

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
		set({ adding: false, removing: false })
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
		set({ ...is, adding: !is.adding })
	}

	function RemoveBtnClick() {
		set({ ...is, removing: !is.removing })
	}

	function ClearBtnClick() {
		const confirmation = window.prompt(
			'Are you sure you got everything?\n\n' +
			'Type \'confirm\' to clear Groceries.'
		);
		if (confirmation === 'confirm') {
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

		let item = { id: short.generate(), name: name, qty: quantity, store: store }

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
			<section ref={outClickRef}>
				<h1 className="title">Groceries</h1>
				{!groceryList.length
					? <div>Nothing here.</div>
					: <div className="content">
						{groceryList.some(g => g.store === 'wholefoods') &&
							<>
								<h3>Whole Foods</h3>
								{groceryList.filter(i => i.store === 'wholefoods').map((item, i) => (
									<div
										key={i}
										className="item"
										onClick={() => removeGrocery(item)}>
										<p>{item.name}</p>
										<p>{item.qty}</p>
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
										className="item"
										onClick={() => removeGrocery(item)}>
										<p>{item.name}</p>
										<p>{item.qty}</p>
									</div>
								))}
							</>
						}
					</div>
				}
				{
					is.adding
						? <div className="action-btns">
							<button onClick={AddBtnClick}><VscDebugStop /></button>
						</div>
						: is.removing
							? <div className="action-btns">
								<button onClick={RemoveBtnClick}><VscDebugStop /></button>
							</div>
							: <div className="action-btns">
								<button onClick={AddBtnClick}><VscDiffAdded /></button>
								<button onClick={RemoveBtnClick}><VscDiffRemoved /></button>
								<button onClick={ClearBtnClick}><VscDebugStop /></button>
							</div>
				}
			</section>
			{is.adding &&
				<SlideModal
					title="Add Grocery"
					smref={outClickRef}
					close={() => ResetAddFormState()}>
					<form onSubmit={(e) => postGrocery(e)} className="groceries">
						<div className="name-quan">
							<input
								name="name"
								type="text"
								placeholder="Name"
								autoComplete="off"
								onChange={(e) => setName(e.target.value)} />
							<input
								type="number"
								min={1}
								placeholder="Quantity"
								onChange={(e) => setQuantity(parseInt(e.target.value))} />
						</div>
						<div className="store">
							<select
								onChange={(e) => setStore(e.target.value)}>
								<option value="wholefoods">Whole Foods</option>
								<option value="bashas">Bashas</option>
							</select>
						</div>
						<button className="submit" type="submit">Submit</button>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default Groceries


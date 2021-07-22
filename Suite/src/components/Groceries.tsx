import React, { useEffect, useState, useRef } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './slide-modal'
import Api from '../api'

export type Grocery = {
	name: string
	qty: number
	store: string
}

const Groceries: React.FC = () => {
	const [is, set] = useState({
		adding: false,
		removing: false
	})

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	const [name, setName] = useState('')
	const [quantity, setQuantity] = useState(1)
	const [store, setStore] = useState('wholefoods')

	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!is.adding) return
		set({ adding: false, removing: false })
	})

	function AddBtnClick() {
		set({ ...is, adding: !is.adding })
	}

	function RemoveBtnClick() {
		set({ ...is, removing: !is.removing })
	}

	function ClearBtnClick() {
		const confirmation = window.confirm('Are You Sure?');
		if (confirmation) {
			Api.ClearGroceryList().then(gl => setGroceryList(gl))
		}
	}

	async function removeGrocery(item: Grocery) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove "${item.name}" ?`);
		if (confirmation) {
			Api.RemoveGrocery(item).then(gl => setGroceryList(gl))
		}
	}

	async function postGrocery(e: any) {
		e.preventDefault()
		if (!is.adding || !name) return

		let item = { name: name, qty: quantity, store: store }

		console.log(item);

		Api.PostGrocery(item).then(gl => setGroceryList(gl))
	}

	useEffect(() => {
		(async () => Api.GetGroceryList().then(gl => setGroceryList(gl)))()
	}, [])

	useEffect(() => {
		groceryList.length && console.log({ GroceryList: groceryList })
	}, [groceryList])

	return (
		<>
			<section>
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
				<div className="action-btns">
					<button onClick={AddBtnClick} disabled={is.removing}>Add</button>
					<button onClick={RemoveBtnClick}>{is.removing ? 'Done' : 'Remove'}</button>
					<button onClick={ClearBtnClick} disabled={is.removing}>Clear</button>
				</div>
			</section>
			{is.adding &&
				<SlideModal smref={modalRef} close={() => set({ ...is, adding: false })} title="Add Grocery">
					<form onSubmit={(e) => postGrocery(e)} className="groceries">
						<div className="name-quan">
							<input
								type="text"
								placeholder="Name"
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


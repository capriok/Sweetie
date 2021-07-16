import React, { useEffect, useRef, useState } from 'react'
import Api from '../api'
import { useOutsideClick } from '../hooks/useOutsideClick'

export type Grocery = {
	name: string
	qty: number
	store: string
}

const GroceryList: React.FC = () => {

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])
	const [editing, toggleEdit] = useState<boolean>(false)

	// const remRef: any = useRef()
	// useOutsideClick(remRef, HandleOutsideClick)
	// function HandleOutsideClick() {
	// }

	function AddBtnClick() {

	}

	async function RemoveBtnClick() {
		toggleEdit(!editing)
	}

	async function removeGrocery(item: Grocery) {
		if (!editing) return

		const confirmation = window.confirm('Are You Sure?');
		if (confirmation) {
			const list: any = await Api.RemoveGrocery(item)
			setGroceryList(list)
		}

	}

	function ClearBtnClick() {
		const confirmation = window.confirm('Are You Sure?');
		if (confirmation) {
			Api.ClearGroceryList().then(gl => setGroceryList(gl))
		}
	}

	useEffect(() => {
		(async () => {
			const list: any = await Api.GetGroceryList()
			setGroceryList(list)
		})()
	}, [])

	useEffect(() => {
		console.log(groceryList)
	}, [groceryList])

	return (
		<section>
			<h1></h1>
			<div className="list">
				{groceryList.some(g => g.store === 'wholefoods') &&
					<>
						<h3>Whole Foods</h3>
						<div className="store">
							{groceryList.map((item, i) => {
								return item.store === 'wholefoods' &&
									<p
										key={i}
										className="item"
										onClick={() => removeGrocery(item)}
									>{item.name}</p>
							})}
						</div>
					</>}
				{groceryList.some(g => g.store === 'bashas') &&
					<>
						<h3>Bashas</h3>
						<div className="store">
							{groceryList.map((item, i) => {
								return item.store === 'bashas' &&
									<p
										key={i}
										className="item"
										onClick={() => removeGrocery(item)}
									>{item.name}</p>
							})}
						</div>
					</>}
				{!groceryList.length && <div>Nothing here.</div>}
			</div>
			<br />
			<div className="buttons">
				<button onClick={AddBtnClick} disabled={editing}>Add</button>
				<button onClick={RemoveBtnClick}>{editing ? 'Done' : 'Remove'}</button>
				<button onClick={ClearBtnClick} disabled={editing}>Clear</button>
			</div>
		</section>
	)
}

export default GroceryList

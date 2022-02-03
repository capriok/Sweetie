import React, { useEffect, useState } from 'react'
import Api from 'api'

import ViewItem from 'Components/Suite/Components/View/Item'

import 'Styles/Suite/forms/form.scss'
import 'Styles/Suite/forms/grocery.scss'

interface Props {
	socket: Socket
	state: SwtState
}


const GroceryDelete: React.FC<Props> = (props) => {
	const { socket, state } = props

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	useEffect(() => {
		setGroceryList(state.groceryList)
	}, [state.groceryList])

	function deleteClick(item: Grocery) {
		const confirmation = window.confirm(`Remove '${item.name}' ?`);
		if (confirmation) {
			Api.RemoveGrocery(item).then(gl => {
				socket.emit('gl-change', gl)
			})
		}
	}

	function clearClick() {
		const confirmation = window.confirm(
			'Are you sure you want to clear the list?\n\n'
		);
		if (confirmation) {
			Api.ClearGroceryList().then(gl => {
				socket.emit('gl-change', gl)
			})
		}
	}

	return (
		<div id="form" className="no-form-bg">
			<div className="form-wrap">
				<div className="title">Delete Items</div>
				<div className="grocery">
					<div className="grocery-lists">
						<List list={groceryList} click={deleteClick} type="grocery" />
						<List list={groceryList} click={deleteClick} type="other" />
					</div>
					<button onClick={clearClick}>Clear List</button>
				</div>
			</div>
		</div >
	)
}

export default GroceryDelete

const List: React.FC<any> = ({ list, click, type }) => (
	<>
		<div className="list-title"><h3>{type}</h3></div>
		{!list.some((i: any) => i.type === type)
			? <p className="gl-empty">No items</p>
			: list.filter((i: any) => i.type === type).map((item: any, i: number) => (
				<ViewItem
					key={i}
					className="grocery-wrap"
					onClick={() => click(item)}>
					<p className="name">{item.name}</p>
					<p className="quantity">{item.qty}</p>
				</ViewItem>
			))}
	</>
)
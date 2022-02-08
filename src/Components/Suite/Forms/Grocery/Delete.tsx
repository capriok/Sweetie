import React, { useEffect, useState } from 'react'
import Api from 'api'

import ViewItem from 'Components/Suite/Components/View/Item'

import 'Styles/Suite/forms/form.scss'
import 'Styles/Suite/forms/grocery.scss'

interface Props {
	socket: Socket
	state: SwtState
	closeForm: () => React.SetStateAction<any>
}


const GroceryDelete: React.FC<Props> = (props) => {
	const { socket, state, closeForm } = props

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
				closeForm()
			})
		}
	}

	return (
		<>
			<div id="form" className="no-form-bg">
				<div className="form-wrap">
					<div className="title no-mt">Delete Items</div>
					<div className="grocery">
						<button onClick={clearClick}>Clear List</button>
						{groceryList.map((item: any, i) => (
							<ViewItem key={i} className="grocery-wrap" onClick={() => deleteClick(item)}>
								<p className="name">{item.name}</p>
							</ViewItem>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default GroceryDelete

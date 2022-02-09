import React from 'react'
import Api from 'api'


import 'Styles/Suite/forms/form.scss'
import 'Styles/Suite/forms/grocery.scss'

interface Props {
	socket: Socket
	state: SwtState
	closeForm: () => React.SetStateAction<any>
}


const GroceryDelete: React.FC<Props> = (props) => {
	const { socket, state, closeForm } = props

	function clearAllClick() {
		const confirmation = window.confirm(
			'Clear all items?'
		);
		if (confirmation) {
			Api.RemoveAllGrocery().then(gl => {
				socket.emit('gl-change', gl)
				closeForm()
			})
		}
	}

	function clearCheckedClick() {
		if (!state.groceryList.filter(g => g.checked).length) return

		const confirmation = window.confirm(
			'Clear checked items?'
		)
		console.log(confirmation)

		if (confirmation) {
			Api.RemoveCheckedGrocery().then(gl => {
				socket.emit('gl-change', gl)
				closeForm()
			})
		}
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Delete Items</div>
				<div className="grocery">
					<div className="form-line">
						<label>Checked Items</label>
						<button onClick={clearCheckedClick}>{state.groceryList.filter(g => g.checked).length}</button>
					</div>
					<div className="form-line">
						<label>All Items</label>
						<button onClick={clearAllClick}>{state.groceryList.length}</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GroceryDelete

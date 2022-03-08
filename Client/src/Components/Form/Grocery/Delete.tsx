import React, { useContext } from 'react'
import { AppContext } from 'app'
import { useNavigate } from 'react-router'
import Api from 'api'

import 'Styles/components/form/form.scss'
import 'Styles/components/form/grocery.scss'


const GroceryDelete: React.FC = () => {
	const { socket, state } = useContext(AppContext)

	const navigate = useNavigate()

	function clearAllClick() {
		const confirmation = window.confirm(
			'Clear all items?'
		)
		if (confirmation) {
			Api.RemoveAllGrocery().then(gl => {
				socket!.emit('grocery-change', gl)
				navigate(-1)
			})
		}
	}

	function clearCheckedClick() {
		if (!state!.groceryList.filter(g => g.checked).length) return

		const confirmation = window.confirm(
			'Clear checked items?'
		)
		if (confirmation) {
			Api.RemoveCheckedGrocery().then(gl => {
				socket!.emit('grocery-change', gl)
				navigate(-1)
			})
		}
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="grocery">
					<div className="form-line">
						<label>Checked Items</label>
						<button onClick={clearCheckedClick}>{state!.groceryList.filter(g => g.checked).length}</button>
					</div>
					<div className="form-line">
						<label>All Items</label>
						<button onClick={clearAllClick}>{state!.groceryList.length}</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GroceryDelete

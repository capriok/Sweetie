import React, { useState } from 'react'
import Api from 'api'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}


const GroceryDelete: React.FC<Props> = (props) => {
	const { socket, dispatch } = props

	function deleteClick(item: Grocery) {
		const confirmation = window.confirm(`Remove '${item.name}' ?`);
		if (confirmation) {
			Api.RemoveGrocery(item).then(gl => {
				socket.emit('gl-change', gl)
				dispatch({ type: SwtReducerActions.SETGL, value: gl })
			})
		}
	}


	function clearClick() {
		const confirmation = window.confirm(
			'Are you sure you got everything?\n\n'
		);
		if (confirmation) {
			Api.ClearGroceryList().then(gl => {
				socket.emit('gl-change', gl)
				dispatch({ type: SwtReducerActions.SETGL, value: gl })
			})
		}
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Delete</div>

			</div>
		</div>
	)
}

export default GroceryDelete
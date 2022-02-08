import React from 'react'
import Api from 'api'


import 'Styles/Suite/forms/form.scss'
import 'Styles/Suite/forms/grocery.scss'

interface Props {
	socket: Socket
	closeForm: () => React.SetStateAction<any>
}


const GroceryDelete: React.FC<Props> = (props) => {
	const { socket, closeForm } = props

	function clearAllClick() {
		const confirmation = window.confirm(
			'Clear all items?\n\n'
		);
		if (confirmation) {
			Api.RemoveAllGrocery().then(gl => {
				socket.emit('gl-change', gl)
				closeForm()
			})
		}
	}

	function clearCheckedClick() {
		const confirmation = window.confirm(
			'Clear checked items?\n\n'
		);
		if (confirmation) {
			Api.RemoveCheckedGrocery().then(gl => {
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
						<button onClick={clearCheckedClick}>Clear checked</button>
						<button onClick={clearAllClick}>Clear all</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default GroceryDelete

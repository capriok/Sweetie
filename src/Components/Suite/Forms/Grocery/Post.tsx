import React, { useState } from 'react'
import Api from 'api'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}


interface FormState {
	name: string
	quantity: number
	type: string
}

const INITIAL_FORM: FormState = {
	name: '',
	quantity: 1,
	type: 'grocery',
}

const GroceryPost: React.FC<Props> = (props) => {
	const { socket, dispatch } = props

	const [form, setForm] = useState<any>(INITIAL_FORM)

	function submit(e: any) {
		e.preventDefault()
		if (!form.name) return

		let item = {
			name: form.name,
			qty: form.quantity,
			type: form.type
		}

		console.log(item);
		Api.PostGrocery(item).then(gl => {
			socket.emit('gl-change', gl)
			dispatch({ type: SwtReducerActions.SETGL, value: gl })
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Create</div>
				<form onSubmit={(e) => submit(e)}>
					<div className="form-line name">
						<label htmlFor="name">Name</label>
						<input
							name="name"
							type="text"
							value={form.name}
							placeholder="Name"
							autoFocus={true}
							autoComplete="off"
							onChange={(e) => setForm({ ...form, name: e.target.value })} />
					</div>
					<div className="form-line quantity">
						<label htmlFor="quantity">Quantity</label>
						<input
							name="quantity"
							type="number"
							min={1}
							value={form.quantity}
							placeholder="Quantity"
							onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })} />
					</div>
					<div className="form-line type">
						<label htmlFor="type">Type</label>
						<select
							value={form.type}
							onChange={(e) => setForm({ ...form, type: e.target.value })}>
							<option value="grocery">Grocery</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div className="form-submit">
						<button className="submit" type="submit">Submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default GroceryPost
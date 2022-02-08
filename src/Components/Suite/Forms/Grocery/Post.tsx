import React, { useState } from 'react'
import Api from 'api'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	closeForm: () => React.SetStateAction<any>
}


interface FormState {
	names: Array<string>
	checked: boolean
}

const INITIAL_FORM: FormState = {
	names: [''],
	checked: false
}

const GroceryPost: React.FC<Props> = (props) => {
	const { socket, closeForm } = props

	const [form, setForm] = useState<any>(INITIAL_FORM)

	function submitClick(e: any) {
		e.preventDefault()
		new Promise((resolve) => form.names.forEach((name: any, i: number) => {
			submit(name)
			if (i === form.names.length - 1) resolve('Done')
		})
		).then(() => closeForm())
	}

	function submit(name: string) {
		if (!name) return

		let item = {
			name,
			checked: false
		}

		console.log(item);
		Api.PostGrocery(item).then(gl => {
			socket.emit('gl-change', gl)
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Add Items</div>
				<form onSubmit={(e) => submitClick(e)}>
					{form.names.map((name: string, i: number) =>
						<div key={i} className="form-line name">
							<label htmlFor="name">Name</label>
							<input
								name="name"
								type="text"
								value={name}
								autoFocus={true}
								onChange={(e) => setForm({
									...form,
									names: form.names.map((n: string, index: number) => {
										if (index === i) n = e.target.value
										return n
									})
								})} />
						</div>
					)}
					<div className="form-line name">
						<label htmlFor="add-name">Items +/-</label>
						<button
							type="button"
							name="add-name"
							className="add-button"
							tabIndex={-1}
							onClick={() => {
								if (form.names[form.names.length - 1] === undefined) return
								setForm({
									...form, names: [...form.names, undefined]
								})
							}}
						>+</button>
						{form.names.length !== 1 &&
							<button
								type="button"
								name="delete-name"
								className="delete-button"
								tabIndex={-1}
								onClick={() => {
									form.names.pop()
									setForm({
										...form, names: form.names
									})
								}}
							>-</button>
						}
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
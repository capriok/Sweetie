import React, { useContext, useState } from 'react'
import { AppContext } from 'app'
import { useNavigate } from 'react-router'
import Api from 'api'

import 'Styles/components/form/form.scss'

interface FormState {
	names: Array<string>
	checked: boolean
}

const INITIAL_FORM: FormState = {
	names: [''],
	checked: false
}

const GroceryPost: React.FC = () => {
	const { socket } = useContext(AppContext)

	const navigate = useNavigate()

	const [form, setForm] = useState<any>(INITIAL_FORM)

	function submitClick(e: any) {
		e.preventDefault()
		new Promise((resolve) => form.names.forEach((name: any, i: number) => {
			submit(name)
			if (i === form.names.length - 1) resolve('Done')
		})
		).then(() => navigate(-1))
	}

	function submit(name: string) {
		if (!name) return

		let item = {
			name,
			checked: false
		}

		console.log(item)
		Api.PostGrocery(item).then(gl => {
			socket!.emit('grocery-change', gl)
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Add Items</div>
				<form onSubmit={(e) => submitClick(e)}>
					{form.names.map((name: string, i: number) =>
						<div key={i} className="form-line name">
							<label>Name</label>
							<input
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
						<label>Items +/-</label>
						{form.names.length !== 1 &&
							<button
								type="button"
								className="minus-button"
								tabIndex={-1}
								onClick={() => {
									form.names.pop()
									setForm({
										...form, names: form.names
									})
								}}
							>-</button>
						}
						<button
							type="button"
							className="add-button"
							tabIndex={-1}
							onClick={() => {
								if (!form.names[form.names.length - 1]) return
								setForm({
									...form, names: [...form.names, '']
								})
							}}
						>+</button>
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
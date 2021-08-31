import React from 'react'

const GroceryForm: React.FC<any> = ({ submit, form, setForm }) => {
	return (
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
			<div className="form-line store">
				<label htmlFor="store">Store</label>
				<select
					value={form.store}
					onChange={(e) => setForm({ ...form, store: e.target.value })}>
					<option value="wholefoods">Whole Foods</option>
					<option value="bashas">Bashas</option>
				</select>
			</div>
			<div className="form-submit">
				<button className="submit" type="submit">Submit</button>
			</div>
		</form>
	)
}

export default GroceryForm
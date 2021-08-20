import React from 'react'

const GroceryAdding: React.FC<any> = ({ submit, setName, quantity, setQuantity, setStore }) => {
	return (
		<form onSubmit={(e) => submit(e)}>
			<div className="form-line name">
				<label htmlFor="name">Name</label>
				<input
					name="name"
					type="text"
					placeholder="Name"
					autoComplete="off"
					onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="form-line quantity">
				<label htmlFor="quantity">Quantity</label>
				<input
					name="quantity"
					type="number"
					min={1}
					value={quantity}
					placeholder="Quantity"
					onChange={(e) => setQuantity(parseInt(e.target.value))} />
			</div>
			<div className="form-line store">
				<label htmlFor="store">Store</label>
				<select
					onChange={(e) => setStore(e.target.value)}>
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

export default GroceryAdding
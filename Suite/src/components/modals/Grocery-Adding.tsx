import React from 'react'

const GroceryAdding: React.FC<any> = ({ submit, setName, setQuantity, setStore }) => {
	return (
		<form onSubmit={(e) => submit(e)}>
			<div className="name-quan">
				<input
					name="name"
					type="text"
					placeholder="Name"
					autoComplete="off"
					onChange={(e) => setName(e.target.value)} />
				<input
					type="number"
					min={1}
					placeholder="Quantity"
					onChange={(e) => setQuantity(parseInt(e.target.value))} />
			</div>
			<div className="store">
				<select
					onChange={(e) => setStore(e.target.value)}>
					<option value="wholefoods">Whole Foods</option>
					<option value="bashas">Bashas</option>
				</select>
			</div>
			<button className="submit" type="submit">Submit</button>
		</form>
	)
}

export default GroceryAdding
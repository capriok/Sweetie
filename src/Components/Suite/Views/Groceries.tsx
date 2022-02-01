import React, { useEffect, useState } from 'react'

import ViewItem from '../Components/ViewItem'

import 'Styles/Suite/views/groceries.scss'

const Groceries: React.FC<any> = (props) => {
	const { state, dispatch } = props

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	useEffect(() => {
		setGroceryList(state.groceryList)
	}, [state.groceryList])

	return (
		<div className="groceries">
			<div className="grocery-lists">
				<List list={groceryList} remove={() => { }} type="grocery" />
				<List list={groceryList} remove={() => { }} type="other" />
			</div>
		</div>
	)
}

export default Groceries

const List: React.FC<any> = ({ list, remove, type }) => {

	if (!list.some((i: any) => i.type === type)) return <></>

	return (
		<>
			<div className="list-title"><h3>{type}</h3></div>
			{list.filter((i: any) => i.type === type).map((item: any, i: number) => (
				<ViewItem
					key={i}
					className="grocery-wrap"
					onClick={() => remove(item)}>
					<p className="name">{item.name}</p>
					<p className="quantity">{item.qty}</p>
				</ViewItem>
			))}
		</>
	)
}

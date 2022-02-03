import React, { useEffect, useState } from 'react'

import ViewItem from '../Components/View/Item'

import 'Styles/Suite/views/grocery.scss'

const Grocery: React.FC<any> = (props) => {
	const { state } = props

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	useEffect(() => {
		setGroceryList(state.groceryList)
	}, [state.groceryList])

	return (
		<div className="grocery">
			<div className="grocery-lists">
				<List list={groceryList} type="grocery" />
				<List list={groceryList} type="other" />
			</div>
		</div>
	)
}

export default Grocery

const List: React.FC<any> = ({ list, type }) => {
	if (!list.some((i: any) => i.type === type)) return <></>
	return (
		<>
			<div className="list-title"><h3>{type}</h3></div>
			{list.filter((i: any) => i.type === type).map((item: any, i: number) => (
				<ViewItem key={i} className="grocery-wrap">
					<p className="name">{item.name}</p>
					<p className="quantity">{item.qty}</p>
				</ViewItem>
			))}
		</>
	)
}
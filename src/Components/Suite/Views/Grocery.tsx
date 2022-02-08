import React, { useEffect, useState } from 'react'

import ViewItem from '../Components/View/Item'

import 'Styles/Suite/views/grocery.scss'
import Api from 'api'

const Grocery: React.FC<any> = (props) => {
	const { socket, state } = props

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	function checkGrocery(grocery: Grocery, val: boolean) {
		const item = {
			id: grocery._id,
			name: grocery.name,
			checked: val
		}
		Api.UpdateGrocery(item).then(gl => {
			socket.emit('gl-change', gl)
		})
	}

	useEffect(() => {
		setGroceryList(state.groceryList)
	}, [state.groceryList])

	return (
		<div className="grocery">
			<div className="list-title"><p><b>Items</b></p></div>
			{!groceryList.length
				? <ViewItem><p className="gl-empty">No Items</p></ViewItem>
				: groceryList.map((item: any, i) => (
					<ViewItem key={i} className="grocery-wrap">
						<p className="name">{item.name}</p>
						<div className="check">
							<input
								type="checkbox"
								checked={item.checked}
								onChange={(e) => checkGrocery(item, e.target.checked)} />
						</div>
					</ViewItem>
				))
			}
		</div>
	)
}

export default Grocery
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'app'
import Api from 'api'

import PageItem from 'Components/Page/Item'

import 'Styles/pages/grocery.scss'

const GroceryPage: React.FC = () => {
	const { socket, state } = useContext(AppContext)

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	function checkGrocery(grocery: Grocery, val: boolean) {
		const item = {
			id: grocery._id,
			name: grocery.name,
			checked: val
		}
		Api.UpdateGrocery(item).then(gl => {
			socket!.emit('grocery-change', gl)
		})
	}

	useEffect(() => {
		setGroceryList(state!.groceryList)
	}, [state!.groceryList])

	return (
		<div className="grocery">
			<div className="list-title"><p>Items</p></div>
			{!groceryList.length
				? <PageItem><p className="gl-empty">No Items</p></PageItem>
				: groceryList.map((item: any, i) => (
					<PageItem key={i} className="grocery-wrap">
						<p className="name">{item.name}</p>
						<div className="check">
							<input
								type="checkbox"
								checked={item.checked}
								onChange={(e) => checkGrocery(item, e.target.checked)} />
						</div>
					</PageItem>
				))
			}
		</div>
	)
}

export default GroceryPage
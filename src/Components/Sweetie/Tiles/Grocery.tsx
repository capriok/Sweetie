import { useEffect, useState } from 'react'

import 'Styles/Sweetie/tiles/grocery.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const GroceryTile: React.FC<Props> = (props) => {
	const { state } = props
	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	useEffect(() => {
		setGroceryList(state.groceryList)
	}, [state.groceryList])

	return (
		<div className="grocery-tile">
			<div className="grocery">
				<h3 className="sub-title w-line">Groceries</h3>
				<div className="items">
					{groceryList.map((item: any, i) => (
						<p key={i} className="item">{item.name}</p>
					))}
				</div>
			</div>
		</div>
	)
}

export default GroceryTile
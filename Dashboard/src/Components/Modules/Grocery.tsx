import { useEffect, useState } from 'react'

import 'Styles/modules/grocery.scss'

interface Props {
	state: SwtState
}

const GroceryModule: React.FC<Props> = (props) => {
	const { state } = props
	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	useEffect(() => {
		setGroceryList(state.groceryList)
	}, [state.groceryList])

	return (
		<div className="grocery-module">
			<div className="module-cont">
				<h3 className="_module-title _underline">Groceries</h3>
				{!groceryList.length
					? <div className="no-items">Nothing here, but cookie is always needed</div>
					: <div className="items">
						{groceryList.map((item: any, i) => (
							<p key={i} className="item">{item.name}</p>
						))}
					</div>
				}
			</div>
		</div>
	)
}

export default GroceryModule
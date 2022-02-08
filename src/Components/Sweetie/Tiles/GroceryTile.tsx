import { useEffect, useState } from 'react'

import '../../../Styles/Sweetie/Tiles/Grocery-tile.scss'

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
				<h3 className="sub-title w-line">Grocery</h3>
				<List list={groceryList} />
			</div>
		</div>
	)
}

export default GroceryTile

const List: React.FC<{ list: Grocery[] }> = ({ list }) => (
	<div className="items">
		<div className="first-half">
			{list.slice(0, Math.ceil((list.length) / 2)).map((item: any, i) => (
				<p key={i} className="item">{item.name}</p>
			))}
		</div>
		<div className="second-half">
			{list.slice(Math.ceil((list.length) / 2), list.length).map((item: any, i) => (
				<p key={i} className="item">{item.name}</p>
			))}
		</div>
	</div>
)

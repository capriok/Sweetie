import { useEffect, useState } from 'react'

import '../../../Styles/Sweetie/Tiles/grocery-tile.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const GroceryTile: React.FC<Props> = (props) => {
	const { state } = props
	const [groceryList, setGroceryList] = useState<{ grocery: Array<Grocery>, other: Array<Grocery> }>({
		grocery: [],
		other: [],
	})

	useEffect(() => {
		setGroceryList({
			grocery: state.groceryList.filter(i => i.type === 'grocery'),
			other: state.groceryList.filter(i => i.type === 'other')
		})
	}, [state.groceryList])

	return (
		<div className="grocery-tile">
			<div className="grocery">
				<h3 className="sub-title w-line">Grocery</h3>
				<GroceryList list={groceryList.grocery} />
			</div>
			<div className="other">
				<h3 className="sub-title w-line">Other</h3>
				<GroceryList list={groceryList.other} />
			</div>
		</div>
	)
}

export default GroceryTile

const GroceryList: React.FC<{ list: Grocery[] }> = ({ list }) => (
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

import { useEffect, useState } from 'react'

import '../../../Styles/Sweetie/Tiles/grocery-tile.scss'

const GroceryTile: React.FC<{ state: SwtState }> = ({ state }) => {
	const [groceryList, setGroceryList] = useState<{ wholeFoods: Array<Grocery>, bashas: Array<Grocery> }>({
		wholeFoods: [],
		bashas: [],
	})

	useEffect(() => {
		setGroceryList({
			wholeFoods: state.groceryList.filter(i => i.store === 'wholefoods'),
			bashas: state.groceryList.filter(i => i.store === 'bashas')
		})
	}, [state.groceryList])

	return (
		<div className="grocery-tile">
			<div className="wholefoods">
				<h3 className="sub-title w-line">Whole Foods</h3>
				<GroceryList list={groceryList.wholeFoods} />
			</div>
			<div className="bashas">
				<h3 className="sub-title w-line">Bashas</h3>
				<GroceryList list={groceryList.bashas} />
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

import { useEffect, useState } from 'react'
import Api from '../../../api'

import '../../../Styles/Sweetie/Tiles/groceries.scss'

const Groceries: React.FC = () => {
	const [groceryList, setGroceryList] = useState<{ wholeFoods: Array<Grocery>, bashas: Array<Grocery> }>({
		wholeFoods: [],
		bashas: [],
	})

	useEffect(() => {
		(async () => Api.GetGroceryList().then(gl => {
			console.log({ GroceryList: gl })
			const wholeFoods = gl.filter(i => i.store === 'wholefoods')
			const bashas = gl.filter(i => i.store === 'bashas')
			setGroceryList({ wholeFoods, bashas })
		}))()
	}, [])

	return (
		<div className="grocerylist">
			<div className="wholefoods">
				<h3 className="sub-title w-line">Whole Foods</h3>
				{!groceryList.wholeFoods.length
					? <div className="center"><p>All Stocked.</p></div>
					: <div className="items">
						<div className="first-half">
							{groceryList.wholeFoods
								.slice(0, Math.ceil((groceryList.wholeFoods.length) / 2))
								.map((item: any, i) => (
									<p key={i} className="item">{item.name}</p>
								))}
						</div>
						<div className="second-half">
							{groceryList.wholeFoods
								.slice(Math.ceil((groceryList.wholeFoods.length) / 2), groceryList.wholeFoods.length)
								.map((item: any, i) => (
									<p key={i} className="item">{item.name}</p>
								))}
						</div>
					</div>
				}
			</div>
			<div className="bashas">
				<h3 className="sub-title w-line">Bashas</h3>
				{!groceryList.bashas.length
					? <div className="center"><p>All Stocked.</p></div>
					: <div className="items">
						<div className="first-half">
							{groceryList.bashas
								.slice(0, Math.ceil((groceryList.bashas.length) / 2))
								.map((item: any, i) => (
									<p key={i} className="item">{item.name}</p>
								))}
						</div>
						<div className="second-half">
							{groceryList.bashas
								.slice(Math.ceil((groceryList.bashas.length) / 2), groceryList.bashas.length)
								.map((item: any, i) => (
									<p key={i} className="item">{item.name}</p>
								))}
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default Groceries
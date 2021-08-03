import { useEffect, useState } from 'react'
import Api from '../api'

import '../styles/groceries.scss'

const Groceries: React.FC = () => {

	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	useEffect(() => {
		(async () => Api.GetGroceryList().then(gl => setGroceryList(gl)))()
	}, [])

	useEffect(() => {
		groceryList.length && console.log({ GroceryList: groceryList })
	}, [groceryList])

	return (
		<div className="grocerylist">
			<h1>Groceries</h1>
			{groceryList.some((g: any) => g.store === 'wholefoods') &&
				<>
					<h3>Whole Foods</h3>
					<div className="store">
						{groceryList.map((item: any, i) => {
							return item.store === 'wholefoods' &&
								<p key={i} className="item">{item.name}</p>
						})}
					</div>
				</>}
			{groceryList.some((g: any) => g.store === 'bashas') &&
				<>
					<h3>Bashas</h3>
					<div className="store">
						{groceryList.map((item: any, i) => {
							return item.store === 'bashas' &&
								<p key={i} className="item">{item.name}</p>
						})}
					</div>
				</>}
			{!groceryList.length && <div className="center"><p>All good here.</p></div>}
		</div>
	)
}

export default Groceries
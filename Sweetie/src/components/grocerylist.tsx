import { useEffect, useState } from 'react'

import '../styles/grocerylist.scss'

const GroceryList: React.FC = () => {

	const [groceries, setGroceries] = useState<any>([
	])

	useEffect(() => {
	}, [])

	return (
		<div className="grocerylist">
			<h1>Groceries</h1>
			{groceries.some((g: any) => g.store === 'wholefoods') &&
				<>
					<h3>Whole Foods</h3>
					<div className="store">
						{groceries.map((item: any, i: any) => {
							return item.store === 'wholefoods' &&
								<p key={i} className="item">{item.name}</p>
						})}
					</div>
				</>}
			{groceries.some((g: any) => g.store === 'bashas') &&
				<>
					<h3>Bashas</h3>
					<div className="store">
						{groceries.map((item: any, i: any) => {
							return item.store === 'bashas' &&
								<p key={i} className="item">{item.name}</p>
						})}
					</div>
				</>}
			{!groceries.length && <div>All good here.</div>}
		</div>
	)
}

export default GroceryList
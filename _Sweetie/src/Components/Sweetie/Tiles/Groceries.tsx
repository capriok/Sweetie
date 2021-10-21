import { useEffect, useState } from 'react'
import Api from '../../../api'

import '../../../Styles/Sweetie/Tiles/groceries.scss'

const Groceries: React.FC = () => {
	const [groceryList, setGroceryList] = useState<Array<Grocery>>([])

	useEffect(() => {
		(async () => Api.GetGroceryList().then(gl => {
			console.log({ GroceryList: gl })
			setGroceryList(gl)
		}))()
	}, [])

	return (
		<div className="grocerylist">
			<div className="wholefoods">
				{!groceryList.some((g: any) => g.store === 'wholefoods') && <>
					<h3 className="sub-title w-line">Whole Foods</h3>
					{!groceryList.length
						? <div className="center"><p>All Stocked.</p></div>
						: <div className="store">
							{groceryList.map((item: any, i) => {
								return item.store === 'wholefoods' &&
									<p key={i} className="item">{item.name}</p>
							})}
						</div>
					}
				</>}
			</div>
			<div className="bashas">
				{!groceryList.some((g: any) => g.store === 'bashas') && <>
					<h3 className="sub-title w-line">Bashas</h3>
					{!groceryList.length
						? <div className="center"><p>All Stocked.</p></div>
						: <div className="store">
							{groceryList.map((item: any, i) => {
								return item.store === 'bashas' &&
									<p key={i} className="item">{item.name}</p>
							})}
						</div>
					}
				</>}
			</div>
		</div>
	)
}

export default Groceries
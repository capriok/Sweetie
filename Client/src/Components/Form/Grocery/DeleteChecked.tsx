import React, { useContext, useEffect } from 'react'
import { AppContext } from 'app'
import { useNavigate } from 'react-router'
import Api from 'api'

import 'Styles/components/form/form.scss'
import 'Styles/components/form/grocery.scss'

const GroceryDeleteChecked: React.FC<any> = () => {
	const { socket } = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			const confirmation = window.confirm(
				'Clear checked items?'
			)

			if (confirmation) {
				Api.RemoveCheckedGrocery().then(gl => {
					socket!.emit('grocery-change', gl)
					navigate(-1)
				})
			} else {
				navigate(-1)
			}
		}, 350)
	}, [])

	return <></>
}

export default GroceryDeleteChecked

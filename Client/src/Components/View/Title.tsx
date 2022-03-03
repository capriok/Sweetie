import React from 'react'
import { useNavigate } from 'react-router'

import 'Styles/components/view/title.scss'

interface Props {
	title: string
}

const ViewTitle: React.FC<Props> = (props) => {
	const { title } = props
	const navigate = useNavigate()

	return (
		<div className="view-title">
			<h2>{title}</h2>
			{title !== 'Overview' &&
				<div className="view-nav" onClick={() => navigate(-1)}>Go back</div>
			}
		</div>
	)
}

export default ViewTitle
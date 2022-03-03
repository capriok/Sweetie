import React from 'react'
import { useNavigate } from 'react-router'

import 'Styles/components/page/title.scss'

interface Props {
	title: string
}

const PageTitle: React.FC<Props> = (props) => {
	const { title } = props
	const navigate = useNavigate()

	return (
		<div className="page-title">
			<h2>{title}</h2>
			{title !== 'Overview' &&
				<div className="page-nav" onClick={() => navigate(-1)}>Go back</div>
			}
		</div>
	)
}

export default PageTitle
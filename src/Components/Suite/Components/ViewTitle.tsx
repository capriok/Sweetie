import React from 'react'

interface Props {
	title: string
	goBack?: () => any
}

const ViewTitle: React.FC<Props> = (props) => {
	const titleProps = {
		className: 'view-title'
	}
	const navProps = {
		className: 'view-nav',
		onClick: props.goBack
	}

	return (
		<div {...titleProps}>
			<h2>{props.title}</h2>
			{props.title !== 'Overview' &&
				<div {...navProps}>Go back</div>
			}
		</div>
	)
}

export default ViewTitle
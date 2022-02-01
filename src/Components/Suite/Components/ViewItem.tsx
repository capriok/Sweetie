import React from 'react'

interface Props {
	className: string
	onClick?: () => any
}

const ViewItem: React.FC<Props> = (props) => {

	const itemProps = {
		className: 'view-item ' + props.className,
		onClick: props.onClick
	}

	return (
		<div {...itemProps}>
			{props.children}
		</div>
	)
}

export default ViewItem
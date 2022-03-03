import React from 'react'

import 'Styles/components/page/item.scss'

interface Props {
	className?: string
	onClick?: () => any
}

const PageItem: React.FC<Props> = (props) => {

	const itemProps = {
		className: 'page-item ' + props.className,
		onClick: props.onClick
	}

	return (
		<div {...itemProps}>
			{props.children}
		</div>
	)
}

export default PageItem
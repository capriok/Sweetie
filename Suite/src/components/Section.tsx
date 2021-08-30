import React from 'react'

import '../styles/section.scss'

const Section: React.FC<any> = ({ title, tabIndex, children }) => {
	return (
		<section>
			<div className="section-title">
				<h1 tabIndex={tabIndex}>{title}</h1>
			</div>
			{children}
		</section>
	)
}

export default Section
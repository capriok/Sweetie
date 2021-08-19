import React from 'react'

import '../styles/section.scss'

const Section: React.FC<any> = ({ title, children }) => {
	return (
		<section>
			<div className="section-title">
				<h1>{title}</h1>
			</div>
			{children}
		</section>
	)
}

export default Section
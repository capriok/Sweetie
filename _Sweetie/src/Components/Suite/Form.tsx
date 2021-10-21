import React from 'react'

import '../../Styles/Suite/form.scss'

const Form: React.FC<any> = ({ title, children }) => {
	return (
		<div id="form">
			<div className="form-cont">
				<p className="title">{title}</p>
				<div className="content">{children}</div>
			</div>
		</div>
	)
}

export default Form
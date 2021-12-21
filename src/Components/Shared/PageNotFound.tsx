import React from 'react'

import "../../Styles/Shared/PageNotFound.scss"

const PageNotFound: React.FC<any> = () => {
	return (
		<div className="page-not-found">
			<h1>Page not found.</h1>
			<div>Uh oh, you seem lost,</div>
			<div>like Joe Biden.</div>
		</div>
	)
}

export default PageNotFound
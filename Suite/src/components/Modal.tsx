import React from 'react'

import '../styles/modal.scss'
// import '../styles/modalforms.scss'

const Modal: React.FC<any> = ({ mref, title, children }) => {

	return (
		<div className="modal-cont" ref={mref}>
			<div className="modal">
				<div className="modal">
					<p className="title">{title}</p>
					<div className="content">{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
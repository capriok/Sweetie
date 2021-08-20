import React from 'react'

import '../styles/modal.scss'

const Modal: React.FC<any> = ({ mref, title, children }) => {
	return (
		<div id="modal" ref={mref}>
			<div className="modal-cont">
				<div className="modal">
					<p className="title">{title}</p>
					<div className="content">{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
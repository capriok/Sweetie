import React from 'react'
import '../styles/slidemodal.scss'

const SlideModal: React.FC<any> = ({ smref, close, title, children }) => {

	return (
		<div className="slidemodal" ref={smref}>
			<div className="modal">
				<div className="closer" onClick={() => close()}>X</div>
				<div className="modal">
					<p className="title">{title}</p>
					<div className="content">{children}</div>
				</div>
			</div>
		</div>
	)
}

export default SlideModal
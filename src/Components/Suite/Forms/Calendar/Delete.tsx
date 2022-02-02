import React, { useState } from 'react'
import Api from 'api'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const CalendarDelete: React.FC<Props> = (props) => {
	const { socket, dispatch } = props

	async function deleteClick(event: CalendarEvent) {
		const confirmation = window.confirm(`Remove '${event.name}' ?`);

		if (confirmation) {
			Api.RemoveCalendarEvent(event).then(ce => {
				socket.emit('ce-change', ce)
				dispatch({ type: SwtReducerActions.SETCE, value: ce })
			})
		}
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Delete</div>

			</div>
		</div>
	)
}

export default CalendarDelete
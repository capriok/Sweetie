import React from 'react'
import { useNavigate } from "react-router-dom"
import { DatesAreOnSameDay } from 'Helpers/TimeHelp'

import ViewItem from 'Components/View/Item'

import 'Styles/views/overview.scss'

interface Props {
	socket: Socket
	state: SwtState
}

const Overview: React.FC<Props> = (props) => {
	const { state } = props
	const navigate = useNavigate()

	function renderCalendarOverview() {
		const todaysEvents = state.calendarEvents.filter((event, i) => {
			return DatesAreOnSameDay(new Date(), new Date(event.date))
		})

		if (!todaysEvents.length) return <p>Day off</p>

		return <div className="ce-ov">
			{todaysEvents.map((e, i) => (
				<p key={i}>
					<span>{e.name}</span>
					<span>{new Date(e.date).toDateString()}</span>
				</p>
			))}
		</div>
	}

	function renderGroceryOverview() {
		const groceryItems = state.groceryList.length

		return <p>{groceryItems} Items</p>
	}

	function renderScheduleOverview() {
		const isFoodDay = state.schedules.food.is
		const isWasteDay = state.schedules.waste.is
		const isFloorDay = state.schedules.floor.is

		if (!isFoodDay && !isWasteDay && !isFloorDay) {
			return <p>Day off</p>
		} else if (isFoodDay && (!isWasteDay || !isFloorDay)) {
			return <p>Food Day</p>
		} else if (isWasteDay && (!isFoodDay || !isFloorDay)) {
			return <p>Waste Day</p>
		} else if (isFloorDay && (!isFoodDay || !isWasteDay)) {
			return <p>Floor Day</p>
		} else {
			return <div className="cs-ov">
				<p>Food Day</p>
				<p>Waste Day</p>
			</div>
		}
	}

	return (
		<div className="overview">
			<Tile
				title="Todays Events"
				onClick={() => navigate('calendar')}>
				{renderCalendarOverview()}
			</Tile>
			<Tile
				title="Groceries"
				onClick={() => navigate('grocery')}>
				{renderGroceryOverview()}
			</Tile>
			<Tile
				title="Schedules"
				onClick={() => navigate('schedule')}>
				{renderScheduleOverview()}
			</Tile>
			<Tile
				title="Options"
				cname="option-tile"
				onClick={() => navigate('options')}>
				Options
			</Tile>
		</div>
	)
}

export default Overview

const Tile: React.FC<any> = ({ title, onClick, cname, children }) => {
	const tileProps = {
		onClick,
		className: `tile-wrap vi-active${cname ? ` ${cname}` : ''}`
	}
	return (
		<div className="tile">
			<div className="tile-title">
				<h4>{title}</h4>
			</div>
			<ViewItem {...tileProps}>
				{children}
			</ViewItem>
		</div>
	)
}
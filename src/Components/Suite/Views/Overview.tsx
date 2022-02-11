import React from 'react'
import { DatesAreOnSameDay } from 'Helpers/TimeHelp'

import ViewItem from '../Components/View/Item'

import 'Styles/Suite/views/overview.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatchView: (value: string) => void
}

const Overview: React.FC<Props> = (props) => {
	const { state, dispatchView } = props

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

	function renderCatsOverview() {
		const isFoodDay = state.catSchedule.food.is
		const isWasteDay = state.catSchedule.waste.is

		if (!isFoodDay && !isWasteDay) {
			return <p>Day off</p>
		} else if (isFoodDay && !isWasteDay) {
			return <p>Food Day</p>
		} else if (isWasteDay && !isFoodDay) {
			return <p>Litter Day</p>
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
				onClick={() => dispatchView('calendar')}>
				{renderCalendarOverview()}
			</Tile>
			<Tile
				title="Groceries"
				onClick={() => dispatchView('grocery')}>
				{renderGroceryOverview()}
			</Tile>
			<Tile
				title="Cats"
				onClick={() => dispatchView('cats')}>
				{renderCatsOverview()}
			</Tile>
			<Tile
				title="Options"
				cname="option-tile"
				onClick={() => dispatchView('options')}>
				Options
			</Tile>
		</div>
	)
}

export default Overview

const Tile: React.FC<any> = ({ title, onClick, cname, children }) => {
	const tileProps = {
		onClick,
		className: `tile-wrap vi-active ${cname}`
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
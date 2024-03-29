import React, { useContext } from 'react'
import { AppContext } from 'app'
import { useNavigate } from "react-router-dom"
import { DatesAreOnSameDay } from 'Helpers/TimeHelp'

import PageItem from 'Components/Page/Item'

import 'Styles/pages/overview.scss'

const OverviewPage: React.FC = () => {
	const { state } = useContext(AppContext)
	const navigate = useNavigate()

	function renderCalendarOverview() {
		const todaysEvents = state!.calendarEvents.filter((event, i) => {
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
		const groceryItems = state!.groceryList.length

		return <p>{groceryItems} Items</p>
	}

	function renderScheduleOverview() {
		const isFoodDay = state!.schedules.food.is
		const isWasteDay = state!.schedules.waste.is
		const isDayOff = !isFoodDay && !isWasteDay

		return <div className="cs-ov">
			{isDayOff && <p>Day off</p>}
			{isFoodDay && <p>Food Day</p>}
			{isWasteDay && <p>Waste Day</p>}
		</div>
	}

	return (
		<div className="overview">
			<Tile
				title="Todays Events"
				onClick={() => navigate('/calendar')}>
				{renderCalendarOverview()}
			</Tile>
			<Tile
				title="Groceries"
				onClick={() => navigate('/grocery')}>
				{renderGroceryOverview()}
			</Tile>
			<Tile
				title="Schedules"
				onClick={() => navigate('/schedule')}>
				{renderScheduleOverview()}
			</Tile>
			<Tile
				title="Options"
				cname="option-tile"
				onClick={() => navigate('/options')}>
				Options
			</Tile>
			<Tile
				cname="sweetie-tile"
				onClick={() => window.location.href = "https://sweetie.kylecaprio.dev"}>
				Sweetie
			</Tile>
		</div>
	)
}

export default OverviewPage

const Tile: React.FC<any> = ({ title, onClick, cname, children }) => {
	const tileProps = {
		onClick,
		className: `tile-wrap pi-active${cname ? ` ${cname}` : ''}`
	}
	return (
		<div className="tile">
			<div className="tile-title">
				<h4>{title}</h4>
			</div>
			<PageItem {...tileProps}>
				{children}
			</PageItem>
		</div>
	)
}
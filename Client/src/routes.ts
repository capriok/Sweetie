import OverviewPage from 'Pages/Overview'
import CalendarPage from 'Pages/Calendar'
import CalendarPost from 'Components/Form/Calendar/Post'
import CalendarUpdate from 'Components/Form/Calendar/Update'
import CalendarDelete from 'Components/Form/Calendar/Delete'
import GroceryPage from 'Pages/Grocery'
import GroceryPost from 'Components/Form/Grocery/Post'
import GroceryDelete from 'Components/Form/Grocery/Delete'
import SchedulePage from 'Pages/Schedule'
import ScheduleUpdate from 'Components/Form/Schedule/Update'
import OptionsPage from 'Pages/Options'

export const routes = [
	{
		path: 'overview/*',
		title: 'Overview',
		component: OverviewPage,
		subRoutes: []
	},
	{
		path: 'calendar/*',
		title: 'Calendar Events',
		component: CalendarPage,
		subRoutes: [
			{
				path: 'post',
				component: CalendarPost
			},
			{
				path: 'update',
				component: CalendarUpdate
			},
			{
				path: 'delete',
				component: CalendarDelete
			}
		]
	},
	{
		path: 'grocery/*',
		title: 'Groceries',
		component: GroceryPage,
		subRoutes: [
			{
				path: 'post',
				component: GroceryPost
			},
			{
				path: 'delete',
				component: GroceryDelete
			}
		]
	},
	{
		path: 'schedule/*',
		title: 'Schedules',
		component: SchedulePage,
		subRoutes: [
			{
				path: 'update',
				component: ScheduleUpdate
			}
		]
	},
	{
		path: 'options',
		title: 'Options',
		component: OptionsPage,
		subRoutes: []
	},
]
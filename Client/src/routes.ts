import Overview from 'Views/Overview'
import Calendar from 'Views/Calendar'
import CalendarPost from 'Components/Forms/Calendar/Post'
import CalendarUpdate from 'Components/Forms/Calendar/Update'
import CalendarDelete from 'Components/Forms/Calendar/Delete'
import Grocery from 'Views/Grocery'
import GroceryPost from 'Components/Forms/Grocery/Post'
import GroceryDelete from 'Components/Forms/Grocery/Delete'
import Schedule from 'Views/Schedule'
import ScheduleUpdate from 'Components/Forms/Schedule/Update'
import Options from 'Views/Options'

export const routes = [
	{
		path: '',
		title: 'Overview',
		component: Overview,
		subRoutes: []
	},
	{
		path: 'calendar/*',
		title: 'Calendar Events',
		component: Calendar,
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
		component: Grocery,
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
		component: Schedule,
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
		component: Options,
		subRoutes: []
	},
]
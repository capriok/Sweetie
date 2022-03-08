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
		path: '/',
		title: 'Overview',
		component: OverviewPage,
		actions: []
	},
	{
		path: 'calendar/*',
		title: 'Calendar Events',
		component: CalendarPage,
		actions: ['post', 'update', 'delete']
	},
	{
		path: 'calendar/post',
		title: 'Add Events',
		component: CalendarPost,
		actions: []
	},
	{
		path: 'calendar/update',
		title: 'Update Event',
		component: CalendarUpdate,
		actions: []
	},
	{
		path: 'calendar/delete',
		title: 'Delete Events',
		component: CalendarDelete,
		actions: []
	},
	{
		path: 'grocery/*',
		title: 'Groceries',
		component: GroceryPage,
		actions: ['post', 'delete']
	},
	{
		path: 'grocery/post',
		title: 'Add Items',
		component: GroceryPost,
		actions: []
	},
	{
		path: 'grocery/delete',
		title: 'Delete Items',
		component: GroceryDelete,
		actions: []
	},
	{
		path: 'schedule/*',
		title: 'Schedules',
		component: SchedulePage,
		actions: ['update']
	},
	{
		path: 'schedule/update',
		title: 'Update Schedules',
		component: ScheduleUpdate,
		actions: []
	},
	{
		path: 'options',
		title: 'Options',
		component: OptionsPage,
		actions: []
	},
]
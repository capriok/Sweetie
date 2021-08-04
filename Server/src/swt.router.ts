import Swt from './swt'
export const router = require('express').Router()

// CALENDER

router.get('/ce', (req, res) => {
	console.log('Request: Calender Events');

	const calenderEvents = Swt.getCalenderEvents()

	res.json({ list: calenderEvents })
})

router.post('/ce-post', (req, res) => {
	console.log('Request: Post Calender Event');

	const { event } = req.body
	const calenderEventList = Swt.postCalenderEvent(event)

	res.json({ list: calenderEventList })
})

router.post('/ce-update', (req, res) => {
	console.log('Request: Update Calender Event');

	const { event } = req.body
	const calenderEventList = Swt.updateCalenderEvent(event)

	res.json({ list: calenderEventList })
})

router.post('/ce-rem', (req, res) => {
	console.log('Request: Remove Calender Event');

	const { id } = req.body
	const calenderEventList = Swt.removeCalenderEvent(id)

	res.json({ list: calenderEventList })
})

// GROCERIES

router.get('/gl', (req, res) => {
	console.log('Request: Grocery List');

	const groceryList = Swt.getGroceryList()

	res.json({ list: groceryList })
})

router.post('/gl-post', (req, res) => {
	console.log('Request: Post Grocery');

	const { item } = req.body
	const groceryList = Swt.postGrocery(item)

	res.json({ list: groceryList })
})

router.post('/gl-rem', (req, res) => {
	console.log('Request: Remove Grocery');

	const { id } = req.body
	const groceryList = Swt.removeGrocery(id)

	res.json({ list: groceryList })
})

router.get('/gl-clr', (req, res) => {
	console.log('Request: Clear Grocery List');

	const groceryList = Swt.clearGroceryList()

	res.json({ list: groceryList })
})

// STATIC TASKS

router.get('/st', (req, res) => {
	console.log('Request: Static Tasks');

	const staticTasks = Swt.getStaticTasks()

	res.json({ list: staticTasks })
})

// TASKS

router.get('/tl', (req, res) => {
	console.log('Request: Task List');

	const taskList = Swt.getTaskList()

	res.json({ list: taskList })
})

router.post('/tl-post', (req, res) => {
	console.log('Request: Post Task');

	const { task } = req.body
	const taskList = Swt.postTask(task)

	res.json({ list: taskList })
})

router.post('/tl-rem', (req, res) => {
	console.log('Request: Remove Task');

	const { id } = req.body
	const taskList = Swt.removeTask(id)

	res.json({ list: taskList })
})

router.get('/tl-clr', (req, res) => {
	console.log('Request: Clear Task List');

	const taskList = Swt.clearTaskList()

	res.json({ list: taskList })
})

// CATS

router.get('/cs', (req, res) => {
	console.log('Request: Cats Schedule');

	const catSchedule = Swt.getCatSchedule()

	res.json({ schedule: catSchedule })
})

router.get('/cd', (req, res) => {
	console.log('Request: Cat Days');

	const catDays = Swt.getCatDays()

	res.json({ days: catDays })
})

router.post('/cd-post', (req, res) => {
	console.log('Request: Post Days');

	const { days } = req.body
	const catDays = Swt.postCatDays(days)

	res.json({ days: catDays })
})


// PLANTS

router.get('/ps', (req, res) => {
	console.log('Request: Plants Schedule');

	const plantSchedule = Swt.getPlantSchedule()

	res.json({ schedule: plantSchedule })
})

router.get('/pl', (req, res) => {
	console.log('Request: Plant List');

	const plantList = Swt.getPlantList()

	res.json({ list: plantList })
})

router.post('/pl-post', (req, res) => {
	console.log('Request: Post Plant');

	const { plant } = req.body
	const plantList = Swt.postPlant(plant)

	res.json({ list: plantList })
})

router.post('/pl-update', (req, res) => {
	console.log('Request: Update Plant');

	const { plant } = req.body
	const plantList = Swt.updatePlant(plant)

	res.json({ list: plantList })
})

router.post('/pl-rem', (req, res) => {
	console.log('Request: Remove Plant');

	const { id } = req.body
	const plantList = Swt.removePlant(id)

	res.json({ list: plantList })
})
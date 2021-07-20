export const router = require('express').Router()
import Swt from './swt'

router.get('/gl', (req, res) => {
	console.log('Request: Grocery List');

	const groceryList = Swt.getGroceryList()

	res.json({ list: groceryList })
})

router.post('/gl-add', (req, res) => {
	console.log('Request: Add Grocery');

	const { item } = req.body
	const groceryList = Swt.addGrocery(item)

	res.json({ list: groceryList })
})

router.post('/gl-rem', (req, res) => {
	console.log('Request: Remove Grocery');

	const { item } = req.body

	const groceryList = Swt.removeGrocery(item)
	console.log(groceryList);

	res.json({ list: groceryList })
})

router.get('/gl-clr', (req, res) => {
	console.log('Request: Clear Grocery List');

	const groceryList = Swt.clearGroceryList()

	res.json({ list: groceryList })
})

router.get('/tl', (req, res) => {
	console.log('Request: Task List');

	const taskList = Swt.getTaskList()

	res.json({ list: taskList })
})

router.post('/tl-add', (req, res) => {
	console.log('Request: Add Task');

	const { task } = req.body
	const taskList = Swt.addTask(task)

	res.json({ list: taskList })
})

router.post('/tl-rem', (req, res) => {
	console.log('Request: Remove Task');

	const { task } = req.body
	const taskList = Swt.removeTask(task)

	res.json({ list: taskList })
})

router.get('/tl-clr', (req, res) => {
	console.log('Request: Clear Task List');

	const taskList = Swt.clearTaskList()

	res.json({ list: taskList })
})


router.get('/pl', (req, res) => {
	console.log('Request: Plant List');

	const plantList = Swt.getPlantList()

	res.json({ list: plantList })
})

router.post('/pl-add', (req, res) => {
	console.log('Request: Add Plant');

	const { plant } = req.body
	const plantList = Swt.addPlant(plant)

	res.json({ list: plantList })
})

router.post('/pl-rem', (req, res) => {
	console.log('Request: Remove Plant');

	const { plant } = req.body
	const plantList = Swt.removePlant(plant)

	res.json({ list: plantList })
})
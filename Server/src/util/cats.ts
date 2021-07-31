
UpdateDaysConfig(schedule, today, cd, lfd, lwd)
function UpdateDaysConfig(schedule, today, cd, lfd, lwd) {
	const day = schedule.find(d => isSameDay(d.date, today))

	// if (day.isFood || day.isWaste) {
	// 	console.log(today);
	// 	if (isSameDay(lfd, today) && isSameDay(lwd, today)) return
	// 	new Sweetie().postCatDays({ lastFoodDay: lfd, lastWasteDay: lwd })
	// }

	if (day.isFood) {
		if (isSameDay(lfd, today)) return
		new Sweetie().postCatDays({ ...cd, lastFoodDay: lfd })
	}
	if (day.isWaste) {
		if (isSameDay(lwd, today)) return
		new Sweetie().postCatDays({ ...cd, lastWasteDay: lwd })
	}
}
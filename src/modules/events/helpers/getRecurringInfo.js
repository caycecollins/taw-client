const getRecurringInfo = form => {
  const daysOfWeek = []
  if (form.repeatWeeklySun && form.repeatWeeklySun.value) daysOfWeek.push(0)
  if (form.repeatWeeklyMon && form.repeatWeeklyMon.value) daysOfWeek.push(1)
  if (form.repeatWeeklyTue && form.repeatWeeklyTue.value) daysOfWeek.push(2)
  if (form.repeatWeeklyWed && form.repeatWeeklyWed.value) daysOfWeek.push(3)
  if (form.repeatWeeklyThu && form.repeatWeeklyThu.value) daysOfWeek.push(4)
  if (form.repeatWeeklyFri && form.repeatWeeklyFri.value) daysOfWeek.push(5)
  if (form.repeatWeeklySat && form.repeatWeeklySat.value) daysOfWeek.push(6)
  return daysOfWeek
}

export default getRecurringInfo

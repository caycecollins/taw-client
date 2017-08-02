const getRecurringInfo = weekly => {
  const daysOfWeek = []
  if (weekly.sun && weekly.sun.value) daysOfWeek.push(0)
  if (weekly.mon && weekly.mon.value) daysOfWeek.push(1)
  if (weekly.tue && weekly.tue.value) daysOfWeek.push(2)
  if (weekly.wed && weekly.wed.value) daysOfWeek.push(3)
  if (weekly.thu && weekly.thu.value) daysOfWeek.push(4)
  if (weekly.fri && weekly.fri.value) daysOfWeek.push(5)
  if (weekly.sat && weekly.sat.value) daysOfWeek.push(6)
  return daysOfWeek
}

export default getRecurringInfo

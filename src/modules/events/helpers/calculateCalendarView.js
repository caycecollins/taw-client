const calculateCalendarView = () =>
  window.innerWidth > 768
    ? JSON.parse(window.localStorage.getItem('events.calendarView')) || 'month'
    : 'agenda'

export default calculateCalendarView

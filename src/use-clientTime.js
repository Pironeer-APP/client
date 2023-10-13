export default function useClientTime(date) {
  const createdDate = new Date(date);
  const renderMonth = createdDate.getMonth() + 1;
  const renderDate = createdDate.getDate();
  const dayNumber = createdDate.getDay();
  const renderHour = createdDate.getHours();
  const renderMinute = createdDate.getMinutes();
  const renderMillisec = createdDate.getMilliseconds();

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const renderDay = dayNames[dayNumber];

  return {
    renderMonth,
    renderDate,
    renderDay,
    renderHour,
    renderMinute,
    renderMillisec,
  };
}

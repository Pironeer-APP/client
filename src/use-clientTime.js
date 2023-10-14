export default function useClientTime(date) {
  const createdDate = new Date(date);
  const renderYear = createdDate.getFullYear();
  const renderMonth = (createdDate.getMonth() + 1).toString().padStart(2, '0');
  const renderDate = createdDate.getDate().toString().padStart(2, '0');
  const dayNumber = createdDate.getDay();
  const renderHour = createdDate.getHours().toString().padStart(2, '0');
  const renderMinute = createdDate.getMinutes().toString().padStart(2, '0');
  const renderMillisec = createdDate
    .getMilliseconds()
    .toString()
    .padStart(2, '0');

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const renderDay = dayNames[dayNumber];

  return {
    renderYear,
    renderMonth,
    renderDate,
    renderDay,
    renderHour,
    renderMinute,
    renderMillisec,
  };
}

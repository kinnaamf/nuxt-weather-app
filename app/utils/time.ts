export const getTime = (timeString: string, index: number) => {
  const hour = parseInt(timeString.split(':')[0]);
  const currentHour = new Date().getHours();

  if (index === 0) return 'Now';

  return hour.toString().padStart(2, '0');
}
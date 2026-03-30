export const getWeekDay = (date: string, index: number) => {
  if (index === 0) return 'Today'
  return new Date(date).toLocaleDateString('en-US', {weekday: "short"})
}
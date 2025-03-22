const formatHourMinute = (hour: number, min: number, indicateHandM: boolean = false): string => {
  if (indicateHandM) {
    return `${hour < 10 ? `0${hour}` : hour}ч  ${min < 10 ? `0${min}` : min}м`
  }
  return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
}

const getTravelTime = (duration: number): string => {
  const hours = Math.trunc(duration / 60)
  const min = duration % 60
  return formatHourMinute(hours, min, true)
}

const getDepartureTime = (departureDate: string | Date): string => {
  const date = new Date(departureDate)
  const hours = date.getHours()
  const min = date.getMinutes()
  return formatHourMinute(hours, min)
}

const getArrivalTime = (departureDate: string | Date, duration: number): string => {
  const date = new Date(departureDate)
  let hours = date.getHours() + Math.trunc(duration / 60)
  const min = (date.getMinutes() + duration) % 60
  if (hours >= 24) hours -= 24

  return formatHourMinute(hours, min)
}

export { getTravelTime, getDepartureTime, getArrivalTime }

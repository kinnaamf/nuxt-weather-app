export interface Forecast {
  cloudcover: number
  conditions: string
  description: string
  dew: number
  feelslike: number
  feelslikemax: number
  feelslikemin: number
  hours: Array<number>
  humidity: number
  icon: string
  precipitations: number
  pressure: number
  snow: number
  severerisk: number
  temperature: number
  temperaturemax: number
  temperaturemin: number
  uvindex: number
  visibility: number
  winddir: number
  windgust: number
  windspeed: number
}
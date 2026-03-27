export interface Forecast {
  cloudCover: number
  conditions: string
  description: string
  dew: number
  feelsLike: number
  feelsLikeMax: number
  feelsLikeMin: number
  hours: Array<number>
  humidity: number
  icon: string
  precipitations: number
  pressure: number
  snow: number
  severeRisk: number
  temperature: number
  temperatureMax: number
  temperatureMin: number
  uvIndex: number
  visibility: number
  windDir: number
  windGust: number
  windSpeed: number
}
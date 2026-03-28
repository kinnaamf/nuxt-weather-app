import type { CurrentCondition } from "~/types/currentConditions";
import type { ForecastDay, HourlyForecast } from "~/types/forecast";

export interface Weather {
  currentConditions: CurrentCondition
  days: ForecastDay[]
  hourlyForecast: HourlyForecast[]
  description: string
}
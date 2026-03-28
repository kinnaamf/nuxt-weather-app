import type { CurrentCondition } from "~/types/currentConditions";
import type { Forecast } from "~/types/forecast";

export interface Weather {
  currentConditions: CurrentCondition
  days: Forecast[]
  description: string
}
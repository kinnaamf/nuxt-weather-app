import CloudyIcon from "~/ui/icons/CloudyIcon.vue";
import SnowIcon from "~/ui/icons/SnowIcon.vue";
import FogIcon from "~/ui/icons/FogIcon.vue";
import WindIcon from "~/ui/icons/WindIcon.vue";
import CloudMoonIcon from "~/ui/icons/CloudMoonIcon.vue";
import CloudSunIcon from "~/ui/icons/CloudSunIcon.vue";
import SunIcon from "~/ui/icons/SunIcon.vue";
import MoonIcon from "~/ui/icons/MoonIcon.vue";
import RainIcon from "~/ui/icons/RainIcon.vue";
import ThermometerIcon from "~/ui/icons/ThermometerIcon.vue";
import DropIcon from "~/ui/icons/DropIcon.vue";
import EyeIcon from "~/ui/icons/EyeIcon.vue";
import PressureIcon from "~/ui/icons/PressureIcon.vue"

export const useWeatherIcons = () => {
  const { weatherData } = useWeather();

  const currentIcon = computed<string | null>(() => {
    return weatherData.value.hourlyForecast?.[0]?.icon ?? null;
  });

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "snow":
        return SnowIcon;
      case "rain":
        return RainIcon;
      case "fog":
        return FogIcon;
      case "wind":
        return WindIcon;
      case "cloudy":
        return CloudyIcon;
      case "partly-cloudy-day":
        return CloudSunIcon;
      case "partly-cloudy-night":
        return CloudMoonIcon;
      case "clear-day":
        return SunIcon;
      case "clear-night":
        return MoonIcon;
      case "thermometer":
        return ThermometerIcon;
      case "drop":
        return DropIcon;
      case "visibility":
        return EyeIcon;
      case "pressure":
        return PressureIcon;
      default:
        return CloudyIcon;
    }
  };

  return {
    getWeatherIcon, currentIcon
  };
};
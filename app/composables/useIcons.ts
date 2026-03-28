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

export const useIcons = () => {
  const iconMap: Record<string, any> = {
    'snow': SnowIcon,
    'rain': RainIcon,
    'fog': FogIcon,
    'wind': WindIcon,
    'cloudy': CloudyIcon,
    'partly-cloudy-day': CloudSunIcon,
    'partly-cloudy-night': CloudMoonIcon,
    'clear-day': SunIcon,
    'clear-night': MoonIcon,
    'thermometer': ThermometerIcon,
    'drop': DropIcon,
    'visibility': EyeIcon,
    'pressure': PressureIcon,
  };

  const getWeatherIcon = (icon: string) => {
    return iconMap[icon] || CloudyIcon;
  };

  return {
    getWeatherIcon,
  };
};
export const useIcons = () => {
  const iconMap: Record<string, string> = {
    'snow': 'Snowflake',
    'rain': 'CloudRain',
    'fog': 'CloudFog',
    'wind': 'Wind',
    'cloudly' : 'Cloud',
    'partly-cloudly-day': 'CloudSun',
    'partly-cloudly-night': 'CloudMoon',
    'clear-day': 'Sun',
    'clear-night': 'Moon'
  };

  const getWeatherIcon = (condition: string): string => {
    return iconMap[condition] || 'Cloud';
  }
  
  return getWeatherIcon;
}
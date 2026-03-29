export const useWeatherBackgrounds = () => {
  const backgrounds: Record<string, string> = {
    'snow': 'linear-gradient(180deg, #7C9CB5 0%, #5A7A94 50%, #3D5A73 100%)',

    'rain': 'linear-gradient(180deg, #2C4A5E 0%, #1E3545 50%, #0F2027 100%)',

    'fog': 'linear-gradient(180deg, #8B95A0 0%, #6B7580 50%, #4A5460 100%)',

    'wind': 'linear-gradient(180deg, #4A769E 0%, #2E5A7D 50%, #1A3E5C 100%)',

    'cloudy': 'linear-gradient(180deg, #5A6B7D 0%, #3E4E5E 50%, #2A3844 100%)',

    'partly-cloudy-day': 'linear-gradient(180deg, #F4A460 0%, #D88C4A 50%, #5B8FB9 100%)',

    'partly-cloudy-night': 'linear-gradient(180deg, #2A3F5F 0%, #1E2D45 50%, #121B2B 100%)',

    'clear-day': 'linear-gradient(180deg, #FDB44B 0%, #E89A3C 50%, #4A90C4 100%)',

    'clear-night': 'linear-gradient(180deg, #0A1628 0%, #152238 50%, #1F2E48 100%)',
  }

  const getWeatherBackground = (icon: string) => {
    return backgrounds[icon] || backgrounds['cloudy'];
  }

  return {
    getWeatherBackground,
  }
}
export const useDescription = () => {
  const { weatherData } = useWeather()

  const humidityDescription = (h: number) => {
    if (h > 80) return 'High humidity level';
    if (h > 50) return 'Moderate humidity level';
    return 'Low humidity level';
  }

  const temperatureDescription = (t: number) => {
    if (t > 30) return "Very hot weather";
    if (t > 20) return "Warm and comfortable";
    if (t > 10) return "Cool temperature";
    return "Cold weather";
  }

  const dewDescription = (d: number) => {
    if (d > 20) return "Oppressive humidity";
    if (d > 15) return "Humid feeling";
    if (d > 10) return "Comfortable";
    return "Dry air";
  };

  const precipDescription = (p: number) => {
    if (p > 10) return "Heavy precipitation";
    if (p > 2) return "Light rain expected";
    return "No significant precipitation";
  };

  const snowDescription = (s: number) => {
    if (s > 5) return "Heavy snowfall";
    if (s > 0) return "Light snow";
    return "No snow";
  };

  const snowDepthDescription = (sd: number) => {
    if (sd > 20) return "Deep snow cover";
    if (sd > 5) return "Moderate snow depth";
    return "Little or no snow";
  };

  const pressureDescription = (p: number) => {
    if (p > 1020) return "High pressure \n(stable weather)";
    if (p > 1000) return "Normal pressure";
    return "Low pressure \n(possible rain)";
  };

  const cloudDescription = (c: number) => {
    if (c > 80) return "Overcast sky";
    if (c > 40) return "Partly cloudy";
    return "Clear sky";
  };

  const visibilityDescription = (v: number) => {
    if (v < 2) return "Very poor visibility";
    if (v < 8) return "Moderate visibility";
    return "Clear visibility";
  };

  const solarDescription = (s: number) => {
    if (s > 800) return "Very strong sunlight";
    if (s > 400) return "Moderate sunlight";
    return "Low sunlight";
  };

  const uvDescription = (uv: number) => {
    if (uv > 8) return "Very high UV risk";
    if (uv > 5) return "Moderate UV risk";
    if (uv > 2) return "Low UV risk";
    return "Minimal UV exposure";
  };

  const windSpeedDescription = (ws: number) => {
    if (ws > 40) return "Strong winds";
    if (ws > 20) return "Moderate wind";
    return "Calm wind";
  };

  return {
    humidityDescription,
    temperatureDescription,
    dewDescription,
    snowDescription,
    snowDepthDescription,
    uvDescription,
    solarDescription,
    visibilityDescription,
    precipDescription,
    pressureDescription,
    windSpeedDescription,
    cloudDescription,
  }
}
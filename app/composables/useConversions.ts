export const useConversions = () => {
  const fahrenheitToCelsius = (temp: number): number => {
    return (temp - 32) * 5 / 9;
  }



  return {
    fahrenheitToCelsius,
  }
}
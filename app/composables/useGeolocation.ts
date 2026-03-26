export const useGeolocation = () => {
  const error = ref<GeolocationPositionError | null>(null);
  const loading = useState("loading", () => false);
  const latitude = ref<number>();
  const longitude = ref<number>();

  const getUserCoords = async () => {
    if (!import.meta.client) return;

    loading.value = true;
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { maximumAge: 60000 });
      });

      latitude.value = position.coords.latitude;
      longitude.value = position.coords.longitude;
    } catch (e: any) {
      console.error(e);
      error.value = e.message;
    }
  }

  return {
    latitude, longitude, loading, getUserCoords,
  }
}
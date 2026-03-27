import type { LocationData } from "~/types/locationData";
import type { Coordinates } from "~/types/coordinates";

export const useGeolocation = () => {
  const error = ref<string | null>(null)
  const loading = ref(false)
  const locationData = ref<LocationData | null>(null)

  const getCoordinates = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!import.meta.client || !navigator.geolocation) {
        reject(new Error("Geolocation is not supported"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (err) => {
          error.value = err
          reject(err)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    })
  }

  const getCityCountry = async (latitude: number, longitude: number) => {
    const response = await $fetch(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          format: 'json',
          lat: latitude,
          lon: longitude,
          'accept-language': 'en',
        },
        headers: {
          'User-Agent': 'Nuxt Weather/1.0',
        }
      }
    )
    const data: any = response

    return {
      city: data.address?.city || data.address?.town || data.address?.village || '',
      country: data.address?.country || '',
    }
  }

  const getLocation = async (): Promise<LocationData | null> => {
    loading.value = true
    error.value = null

    try {
      const coords = await getCoordinates()
      const { city, country } = await getCityCountry(coords.latitude, coords.longitude)

      const result: LocationData = {
        city,
        country,
        coordinates: coords,
      }

      locationData.value = result
      return result
    } catch (err: any) {
      const errorMessage = err.code === 1
        ? 'User declined geolocation usage'
        : err.code === 2
          ? 'Geolocation is not supported'
          : err.code === 3
            ? 'Connection timed out'
            : 'Could not get location'

      error.value = errorMessage
      return null
    } finally {
      loading.value = false
    }
  }


  return {
    locationData,
    error,
    loading,
    getLocation,
    getCoordinates,
  }
}
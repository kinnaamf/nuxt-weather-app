interface Coordinates {
  latitude: number
  longitude: number
  accuracy: number
}

interface Address {
  country?: string
  city?: string
  state?: string
  road?: string
  fullAddress?: string
}

interface LocationData {
  coordinates: Coordinates
  address: Address
}

export const useGeolocation = () => {
  const error = ref<GeolocationPositionError | null>(null)
  const loading = ref(false)
  const locationData = ref<LocationData | null>(null)

  const getCoordinates = (options = {}): Promise<Coordinates> => {
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
            accuracy: position.coords.accuracy,
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
          ...options,
        }
      )
    })
  }

  const getAddressFromCoords = async (
    latitude: number,
    longitude: number
  ): Promise<Address> => {
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
      country: data.address?.country,
      city: data.address?.city || data.address?.town || data.address?.village,
      state: data.address?.state,
      road: data.address?.road,
      fullAddress: data.display_name,
    }
  }

  const getFullLocation = async (): Promise<LocationData> => {
    loading.value = true
    error.value = null

    try {
      const coords = await getCoordinates()
      const address = await getAddressFromCoords(coords.latitude, coords.longitude)

      const result: LocationData = {
        coordinates: coords,
        address: address,
      }

      locationData.value = result

      return result
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    locationData,
    error,
    loading,
    getFullLocation,
    getCoordinates,
    getAddressFromCoords,
  }
}
export type Favorite = {
  city: string;
  country: string;
  countryCode: string;
}

export const useFavorites = () => {
  const favorites = useState<Favorite[]>('favorites', () => []);

  if (import.meta.client && favorites.value.length === 0) {
    try {
      favorites.value = JSON.parse(localStorage.getItem('favorites') || []);
    } catch {
      favorites.value = [];
    }
  }

  const saveFavorites = () => {
    if (!import.meta.client) return;
    localStorage.setItem('favorites', JSON.stringify(favorites.value));
  }

  const toggleFavorites = (location: Favorite) => {
    if (!location) return;

    const index = favorites.value.findIndex(
      (f) => f.city === location.city
    );

    if (index > -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push({
        city: location.city,
        country: location.country,
        countryCode: location.countryCode,
      });
    }

    saveFavorites();
  }

  const isFavorite = (location: Favorite | null) => {
    if (!location) return;

    return favorites.value.some(
      (f) => f.city === location.city
    )
  }

  return {
    favorites,
    isFavorite,
    toggleFavorites,
  }
}
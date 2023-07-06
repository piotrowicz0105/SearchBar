import axios from 'axios';

// stocker les résultats de l'API concernant l'autocomplétion
export const fetchAutocompleteResults = async (query, setResult) => {
  try {
    // Cette fonction fetch les résultats de l'API pour l'autocomplétion
    const response = await axios.get(`https://api.comparatrip.eu/cities/autocomplete/?q=${query}`);
    // Mettre à jour les autocomplétions
    setResult(response.data);
  } catch (error) {
    console.error(error);
  }
};

// stocker les résultats de l'API concernant les destinations populaires
export const fetchPopularCities = async (from) => {
  try {
    const response = await axios.get(`https://api.comparatrip.eu/cities/popular/from/${from}/5`);
    setPopularCitiesResults(response.data);
  } catch (error) {
    console.error(error);
  }
};
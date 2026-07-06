import axios from 'axios';
import { fallbackCountries } from '../data/fallbackCountries';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});

export async function getEuropeanCountries() {
  try {
    const { data } = await api.get(
      '/region/europe?fields=name,capital,flags,population,region,subregion,cca3,maps,languages',
    );

    return data
      .map((country) => ({
        id: country.cca3,
        name: country.name.common,
        officialName: country.name.official,
        capital: country.capital?.[0] ?? 'N/A',
        flag: country.flags.svg,
        flagAlt: country.flags.alt ?? `${country.name.common} flag`,
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        languages: country.languages ? Object.values(country.languages) : [],
        mapUrl: country.maps.googleMaps,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return fallbackCountries;
  }
}

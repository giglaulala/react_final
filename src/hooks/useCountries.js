import { useEffect, useState } from 'react';
import { getEuropeanCountries } from '../services/countriesApi';

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCountries() {
      setStatus('loading');

      try {
        const countriesData = await getEuropeanCountries();

        if (isMounted) {
          setCountries(countriesData);
          setStatus('success');
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError);
          setStatus('error');
        }
      }
    }

    loadCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    countries,
    status,
    error,
  };
}

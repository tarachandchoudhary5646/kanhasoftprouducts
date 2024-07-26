'use client'
import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch {
        setError('Something went wrong');
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loader, error };
}

export default useFetch;

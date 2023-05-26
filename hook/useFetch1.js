import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch1 = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': 'a35358c999msh6ebd8cda41cfa90p18624ejsnf41dbc06bcfc',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to track mounted/unmounted component

    fetchData();

    return () => {
      // Cleanup function to cancel the request and prevent memory leaks
      isMounted = false;
    };
  }, []);

  const refetch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
};

export default useFetch1;

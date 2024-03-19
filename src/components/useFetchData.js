import { useEffect, useState, useCallback } from "react";

const useFetchData = () => {
  const [status, setStatus] = useState('idle');
  const [butchers, setButchers] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = useCallback((url, setData) => {
    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        setData(incomingData);
        setStatus('fetched');
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    const butcherUrl = "http://localhost:3005/butchers";
    const userUrl = "http://localhost:3005/users";

    fetchData(butcherUrl, setButchers);
    fetchData(userUrl, setUsers);
  }, [fetchData]); // Added fetchData to the dependency array

  return { status, butchers, users };
};

export default useFetchData;

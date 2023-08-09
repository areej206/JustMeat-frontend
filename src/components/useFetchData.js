import  { useEffect, useState, useCallback } from "react";

const useFetchData = () => {
    const [status, setStatus] = useState('idle');
    const [foods, setFoods]=useState([{
        id:"",
        name:"",
        price:"",
        category:"",
        available:"",
      }]);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3001/food";
    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData)
        setFoods(incomingData);
        setStatus('fetched');
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, foods };
};
export default useFetchData;
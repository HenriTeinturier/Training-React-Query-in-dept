import axios from "axios";
import { useEffect, useState } from "react"

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes')
    .then((response) => {
      setData(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>loading...</h2>
  }


  return (
    <>
      <h1>Super Heroes Page</h1>
      {data.map((hero) => {
        return <div>{hero.name}</div>
      })}
    </>
  )
}

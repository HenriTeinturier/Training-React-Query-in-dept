import axios from "axios";
import { useEffect, useState } from "react"
import { Hero } from "../models/models";

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Hero[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes')
    .then((response) => {
      setData(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }


  return (
    <>
      <h1>Super Heroes Page</h1>
      {data.map((hero: Hero) => {
        return <div>{hero.name}</div>
      })}
    </>
  )
}

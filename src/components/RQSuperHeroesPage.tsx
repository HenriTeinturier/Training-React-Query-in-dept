import axios from "axios";
import { useQuery } from "react-query";
import { Hero } from "../models/models";

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes');
};

export const RQSuperHeroesPage = () => {

  const { isLoading, data } = useQuery('superheroes', fetchSuperHeroes);

  if (isLoading) {
    return <h2>loading...</h2>
  }

  return  (
    <>
      <h1>React-Query Super Heroes Page</h1>
      {
        data?.data.map( (hero: Hero) => 
           <div>{hero.name}</div>
        )
      }
    </>
  )
};

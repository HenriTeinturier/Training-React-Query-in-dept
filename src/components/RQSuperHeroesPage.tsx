import axios from "axios";
import { useQuery } from "react-query";
import { Hero } from "../models/models";

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes');
};

  //by default the query cache time is 5 minnutes.

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      cacheTime: 5000, 
      // change cacheTime to 5s. After 5s the query becomes inactive.
    }
    );



  if (isLoading) {
    return <h2>loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  } 

  return  (
    <>
      <h1>RQ Super Heroes Page</h1>
      {
        data?.data.map( (hero: Hero) => 
          <div>{hero.name}</div>
        )
      }
    </>
  )
};

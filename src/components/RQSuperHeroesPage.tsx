import axios from "axios";
import { useQuery } from "react-query";
import { Hero } from "../models/models";

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes');
};

  //by default the query cache time is 5 minnutes.
  //the defaukt staleTime is 0 seconds

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      cacheTime: 5000, // change cacheTime to 5s. After 5s the query becomes inactive.
      staleTime: 10000, // time without call from react-query. Only cache data is used.
      // cache can be more longer than staleTime. We keep in cache the data and call only when staleTime is reached.
      //* the query has a fresh tag when staleTime is not reached. after staleTime is reached, the query has a stale tag.
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

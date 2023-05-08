import axios from "axios";
import { useQuery } from "react-query";
import { Hero } from "../models/models";

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes');
};


export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: default = 5minutes. After 5 minuutes isLoading will restart.
      // after cacheTime is reached the query is inactive.
      // staleTime: default = 0s No stale = fetching each time we need data.
      // refetchOnMount:  if true (default value), the query is called each time the component is mounted/rendered. If false, the query is called only when the component is mounted.
      //refetchOnWindowFocus:  by defautt true. Each time loses and agins focuns again a call is made. 
      refetchInterval: 1000, // by default is false. If true, the query is called each 1000ms. // ! if loseFocus, refetchInterval it's paused. 
      refetchIntervalInBackground: true // by default is false. If true, the query is called each 1000ms even if the window is not focused.
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

import axios from "axios";
import { useQuery } from "react-query";
import { Hero } from "../models/models";

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes');
};

// useQuery offert refetch to manually trigger the query.

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, isFetching,  refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: default = 5minutes. After 5 minuutes isLoading will restart.
      // after cacheTime is reached the query is inactive.
      // staleTime: default = 0s No stale = fetching each time we need data.
      // refetchOnMount:  if true (default value), the query is called each time the component is mounted/rendered. If false, the query is called only when the component is mounted.
      //refetchOnWindowFocus:  by defautt true. Each time loses and agins focuns again a call is made. 
      //refetchInterval:  // by default is false. If number 1000, the query is called each 1000ms. if loseFocus, refetchInterval it's paused. 
      //refetchIntervalInBackground: by default is false. If true, the query is called each refetchInterval even if the window is not focused.
      enabled: false, // by default is true. If false, the query is not called.
    }
    );



  if (isLoading || isFetching) {
    return <h2>loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  } 

  return  (
    <>
      <h1>RQ Super Heroes Page</h1>
      <button onClick={refetch}>Fetch heroes</button>
      {
        data?.data.map( (hero: Hero) => 
          <div>{hero.name}</div>
        )
      }
    </>
  )
};

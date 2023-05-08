import axios from "axios";
import { useQuery } from "react-query";
import { Hero } from "../models/models";

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes');
};

const onSuccess = (data) => {
  console.log('onSuccess', data)
}

const onError = (error) => {
  console.log('onError', error)
}

// select automatically receives the api data as argument

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // since the key ond value is the same, we can just pass the key
      // onSuccess: onSuccess,
      // onError: onError
      onSuccess,
      onError,
      // select: (response) => response.data
      select: (response) =>{
        const superHeroNames = response.data.map((hero: Hero) => hero.name);
        return superHeroNames
      }

    }
    );



  if (isLoading ) {
    return <h2>loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  } 

  return  (
    <>
      <h1>RQ Super Heroes Page</h1>
      <button onClick={refetch}>Fetch heroes</button>
      {/* {
        data?.data.map( (hero: Hero) => 
          <div>{hero.name}</div>
        )
      } */}
       {
        data.map( (name: string) => 
          <div>{name}</div>
        )
      }
    </>
  )
};

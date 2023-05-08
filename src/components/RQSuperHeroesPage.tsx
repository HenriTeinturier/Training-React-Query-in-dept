import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Hero } from "../models/models";



const onSuccess = (data) => {
  console.log('onSuccess', data)
}

const onError = (error) => {
  console.log('onError', error)
}

// select automatically receives the api data as argument

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(onSuccess, onError)



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
      {
        data?.data.map( (hero: Hero) => 
          <div>{hero.name}</div>
        )
      }
    </>
  )
};

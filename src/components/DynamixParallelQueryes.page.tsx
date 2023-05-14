import axios from 'axios'
import { useQueries } from 'react-query'

const fetchSuperHero = async (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

type DynamicParallelQueriesProps = {
  heroIds: number[]
}

export const DynamicParallelQueriesPage = ({heroIds}: DynamicParallelQueriesProps) => {

  const queryResults = useQueries(
    // On map sur notre tableau puis l'on retourne un objet avec les caractéristiques habituelles de useQuery: key, function, options...
    heroIds.map(id => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      }
    })
  )
  // useQueries return un tableau des résultats de chaque queries.
    console.log(queryResults)

  return (
    <>
      <h3>Dynamic Parallel Queries Page</h3>
      {queryResults.map((result, index) => {
        const {isLoading, error, data } = result
        return (
          <div key={index}>
            {isLoading && <h4>loading...</h4>}
            {error && <h4>{error}</h4>}
            {data && <div style={{marginBottom: '10px', color: '#646cff'}}>{data.data.name}</div>}
          </div>
        )
      })
    }
    </>
  ) 
}
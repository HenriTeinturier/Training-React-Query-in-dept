import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({pageParam = 1}) => {
  console.log('pageParam', pageParam)
  // comme rien n'est envoyé lors de la première requête on défini pageParam à 1 par défaut
  // à la secoonde requête il sera égal à 2 et ainsi de suite
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {
  // hasNextPage est true or false selon la réponse de getNextPage.
  // si undefined cela veut dire qu'il  n'y a plus de page à charger
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage }  = useInfiniteQuery(
    ['colorsInfinite'],
    fetchColors,
    {
      getNextPageParam: (lastPage, pages) => {
        // pages est un tableau des réponses pour chaque requête..
        // lastPage c'est les données de la dernières page/requete reçue.
        console.log('lastPage', lastPage)
        // console.log('pages', pages)
        if (pages.length < 4) {
          return pages.length + 1
        } else {
          return undefined
        }
      }
    }
  )

  console.log('data', data)

  if (isLoading) {
    return <h3>loading...</h3>
  }

  if (isError) {
    return <h3>{error.message}</h3>
  }

  return (
    <>
      <h3>Infinite Queries</h3>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        {data?.pages.map((group, index) => {
          return (
          <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Fragment
              key={index} 
              // style={{ color: 'white', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', borderRadius: '10px', padding: '10px 5px'}}
            >
              
              {
                group?.data?.map((color: any) => (
                  <div 
                    key={color.id}
                    style={{backgroundColor: color.name, color: 'white', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', borderRadius: '10px', padding: '10px 5px'}}
                  >
                    {color.name}
                  </div>
                ))
              }
            </Fragment>
          </div>

        )
        }
        )}
      </div>
      <div>
        <button 
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          style={{margin: '10px'}}
        >
          {isFetchingNextPage 
            ? `Loading more...`
            : hasNextPage
            ? `Load More`
            : `Nothing more to load`
            }
        </button>
        {/* <button
          onClick={() => fetchNextPage({pageParam: 4})}
        >
          skip to last Page
        </button> */}
      </div>
    </>
  )

}
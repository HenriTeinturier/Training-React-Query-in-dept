import { useInfiniteQuery } from "react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

const fetchColors = ({pageParam = 1}) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesScrollPage = () => {
  const { ref, inView } = useInView()
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
    ['colorsInfiniteScroll'],
    fetchColors,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1
        } else {
          return undefined
        }
      }
    }
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (isLoading) {
  return <h3>loading...</h3>
  }

  if (isError) {
    return <h3>{error.message}</h3>
  }

  

  return  (
    <>
      <h3>Infinite Queries</h3>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        {data?.pages.map((group, index) => {
          return (
          <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginBottom: '500px'}}>
            <div
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
            </div>
          </div>

        )
        }
        )}
      </div>
      <div>
        <button 
          ref={ref}
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
        <div>
          {isFetching && !isFetchingNextPage
            ? 'Background Updating...'
            : null
          }
        </div>
      </div>
    </>

  )
}
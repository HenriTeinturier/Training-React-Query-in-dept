import { useQuery } from 'react-query'
import axios from 'axios'
import { useState } from 'react'

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      // keep previous data when fetching new data. So no loading state
      // but in this case we can see isFetching state
      keepPreviousData: true,
    }
  )
  
  if (isLoading) {
    return <h3>loading...</h3>
  }

  if (isError) {
    return <h3>{error.message}</h3>
  }

  console.log(data)

  return  (
    <>
      <h3>PaginedQueriesPage</h3>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {data?.data.map((color: any) => 
          <div
            key={color.id} 
            style={{backgroundColor: color.name, color: 'white', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', borderRadius: '10px', padding: '10px 5px'}}
          >
            {color.name}
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
          style={{margin: '10px'}}
        >
          {`Previous ${isFetching ? '...' : ''}`}
        </button>
        <button 
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === 4}
          style={{margin: '10px'}}
        >
          {`Next ${isFetching ? '...' : ''}`}
        </button>
      </div>
    
    </>

  )
}
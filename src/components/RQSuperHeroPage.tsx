
import { useSuperHeroData } from "../hooks/useSuperHeroeData"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AxiosError } from "axios"

export const RQSuperHeroPage = () => {

  interface Params {
    heroId: string
  }

  const { heroId } = useParams<Params>()
  const parsedHeroId = parseInt(heroId, 10);

  const {data: hero, isLoading, error, isError} = useSuperHeroData(parsedHeroId)

  if (isLoading) {
    return <h2>loading...</h2>
  }

  if (isError ) {
    return <h2>{error.message}</h2>
  }



  return (
    <>
      {/* <h1>RQ Super Hero Page</h1> */}
      <Link to='/rq-super-heroes' >
        <button
          style={{marginBottom: '20px'}}
        >
          Back To Heroes
        </button>
      </Link>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            border: '1px solid #4A50C0',
            backgroundColor: '#4A50C0',
            margin: '10px',
            padding: '10px 15px',
            borderRadius: '5px',
            width: '150px', 
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',       
          }}
        >
          <div
            style={{
              marginBottom: '10px',
            }}
          >
            {hero?.name}
          </div>
          <div
            style={{
              marginBottom: '10px',
              fontStyle: 'italic',
            }}
          >
            {hero?.alterEgo}
          </div>
        </div>

      </div>
    </>
  )
}

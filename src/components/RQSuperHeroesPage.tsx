import { useState } from "react";
import { useAddSuperHeroData, useDeleteSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { Hero } from "../models/models";
import { Link } from "react-router-dom";
import {RemoveCircleIcon} from '@sanity/icons'


const onSuccess = (data) => {
  // console.log('onSuccess', data)
}

const onError = (error) => {
  // console.log('onError', error)
}

// select automatically receives the api data as argument

export const RQSuperHeroesPage = () => {
  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(onSuccess, onError)
  const { mutate: addHero } = useAddSuperHeroData()
  const { mutate: deleteHero } = useDeleteSuperHeroData()

  const [name, setName] = useState<string>('')
  const [alterEgo, setAlterEgo] = useState<string>('')

  const handleAddHeroClick = () => {
    console.log(name, alterEgo)
    const hero = {name, alterEgo}
    addHero(hero)
  }

  const handleDeleteHeroClick = (heroId: number) => {

    deleteHero(heroId)
  }

  if (isLoading ) {
    return <h2>loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  } 

  return  (
    <>
      {/* <h1>RQ Super Heroes Page</h1> */}
      <div style={{marginBottom: '12px'}}>
        <input
          className="inputHero"
          type="text"
          value={name}
          placeholder="Add Super Hero Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="inputHero"
          value={alterEgo}
          placeholder="Add Super Hero Alter Ego"
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button
          onClick={handleAddHeroClick}
          style={{margin: '10px'}}
        >
          Add Hero
        </button>
      </div>
      <button 
        onClick={refetch}
        style={{marginBottom: '20px'}}
      >
        Fetch heroes
      </button>
      {
        data?.data.map( (hero: Hero) => 
          
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Link to={`/rq-super-heroes/${hero.id}`}>
                <div 
                  key={hero.id}
                  style={{cursor: 'pointer', marginBottom: '10px', width: '300px', textAlign: 'center'}}
                >
                  {hero.name}
                </div>
              </Link>
              <div 
                style={{width: '100px'}}
                onClick={() => handleDeleteHeroClick(hero.id)}
              >
                <RemoveCircleIcon 
                  style={{
                    marginLeft: '30px', 
                    fontSize: '30px', 
                    marginBottom: '10px', 
                    cursor: 'pointer'
                  }} 
                />
              </div>
            </div>
        )
      }
    </>
  )
};

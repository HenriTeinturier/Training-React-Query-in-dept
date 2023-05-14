import { useQuery } from 'react-query'
import axios from 'axios'


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = async () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {

  const {data: superHeroes} = useQuery('super-heroes', fetchSuperHeroes)
  const { data: friends} = useQuery('friends', fetchFriends)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '20px',
        // backgroundColor: '#1a1a1a',
      }}
    >
      <div style={{ flex: '1' }}>
        <h3 style={{ background: '#4a50c0', color: 'white', padding: '10px', borderRadius: '10px' }}>
          Friends
        </h3>
        {friends &&
          friends?.data.map((friend) => (
            <div
              key={friend.id}
              className="card"
              style={{
                background: '#747bff',
                color: 'white',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
              }}
            >
              <h4>{friend.name}</h4>
              <p>Alter Ego: {friend.alterEgo}</p>
            </div>
          ))}
      </div>
      <div style={{ flex: '1' }}>
        <h3 style={{ background: '#4a50c0', color: 'white', padding: '10px', borderRadius: '10px' }}>
          Superheroes
        </h3>
        {superHeroes &&
          superHeroes?.data.map((hero) => (
            <div
              key={hero.id}
              className="card"
              style={{
                background: '#747bff',
                color: 'white',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
              }}
            >
              <h4>{hero.name}</h4>
              <p>Alter Ego: {hero.alterEgo}</p>
            </div>
          ))}
      </div>
    </div>
  );
  
}
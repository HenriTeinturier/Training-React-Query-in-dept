import { useQuery } from 'react-query'
import axios from 'axios'


const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = async () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {

  useQuery('super-heroes', fetchSuperHeroes)
  useQuery('friends', fetchFriends)

  return <div>Parallel Queries Page</div>
}
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export const useSuperHeroData = (heroId: number) => {
  return useQuery(
    ['super-hero', heroId],
    () => fetchSuperHero(heroId),

  )
}

// because ReactQuery passes the argument automatically to the fetchFonction, we can replace the code above with this one:

// const fetchSuperHero = ({ queryKey }) => {
//   // queryKey is an array of the arguments passed to the useQuery hook
//   const heroId = queryKey[1];
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// }

// export const useSuperHeroData = (heroId: number) => {
//   return useQuery(
//     ['super-hero', heroId],
//     fetchSuperHero,

//   )
// }
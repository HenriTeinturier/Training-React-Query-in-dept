import {useQuery, useMutation} from "react-query";
import axios from "axios";
// import { Hero } from "../models/models";

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes');
};

type Hero = {name: string, alterEgo: string}

const addSuperHero = async (hero:Hero) => {
  return axios.post(`http://localhost:4000/superheroes`, hero);
};

const deleteSuperHero = async (heroId: number) => {
  return axios.delete(`http://localhost:4000/superheroes/${heroId}`);
}


export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
    }
    );
}

export const useAddSuperHeroData = () => {
  return useMutation(
    addSuperHero,
  );
}

export const useDeleteSuperHeroData = () => {
  return useMutation(
    deleteSuperHero,
  );
}
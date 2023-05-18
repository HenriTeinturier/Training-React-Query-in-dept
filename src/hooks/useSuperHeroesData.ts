import {useQuery, useMutation, useQueryClient} from "react-query";
import axios from "axios";
import { Hero as HeroDTO } from "../models/models";

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
  const queryClient = useQueryClient();
  return useMutation(
    addSuperHero,
    {
      // we can use data to access the data returned by the server on success response
      onSuccess: (data) => {
        // invalidateQueries will refetch the data from the server
        // we remove invalidateQueries for not recall data
        // instead we change cache directly with setQeueryData
        // queryClient.invalidateQueries('super-heroes');
        queryClient.setQueryData(
          'super-heroes',
          // ollQueryData is refer to old query cache
          (oldQueryData: {data: HeroDTO[] }) => {
            return {
              ...oldQueryData,
              // oldQueryData.data contains our cache data
              // data.data contains the new data returned by the server
              // so we take oldData and add the new data to it
              data: [...oldQueryData.data, data.data]
             }
          });
      }
    }
  );
}

export const useDeleteSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    deleteSuperHero,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('super-heroes');
      }
    }
  );
}
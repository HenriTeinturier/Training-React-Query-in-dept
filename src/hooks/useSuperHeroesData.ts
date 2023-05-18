import {useQuery, useMutation, useQueryClient} from "react-query";
import axios, { AxiosError } from "axios";
import { Hero as HeroDTO } from "../models/models";
import { v4 as uuidv4 } from 'uuid';

const fetchSuperHeroes = async () => {
  return axios.get('http://localhost:4000/superheroes')
  .then((response) => response)
  .catch((error) => {throw error} )
  ;
};

type Hero = {name: string, alterEgo: string}

const addSuperHero = async (hero:Hero) => {
  return axios.post(`http://localhost:4000/superheroes`, hero);
};

const deleteSuperHero = async (heroId: number) => {
  return axios.delete(`http://localhost:4000/superheroes/${heroId}`);
}


export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery<HeroDTO[], AxiosError>(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess: onSuccess,
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

export const useAddSuperHeroDataOptimistic = () => {
  // Allow changing the state without waiting for the response from the back end.
  // so if we add a new hero we can see it immediately in the list
  const queryClient = useQueryClient();
  return useMutation(
    addSuperHero,
    {
      // onMutate is called before the mutation function is fired.
      // and is passed the same variables the mutation function would receive
      // in your case is the newHero we want to add.
      // we need to await queryCancel so async is required
      onMutate: async (newHero) => {
        // we cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('super-heroes');
        // we need to snapshot the previous value if we need to rollback
        const previousHeroData = queryClient.getQueryData('super-heroes');
        // we modify the cache manually to add the newHero
        queryClient.setQueryData(
          'super-heroes',
          // ollQueryData is refer to old query cache
          (oldQueryData: {data: HeroDTO[] }) => {
            const id = uuidv4();
            // console.log(id)
            return {
              ...oldQueryData,
              // oldQueryData.data contains our cache data
              // data.data contains the new data returned by the server
              // so we take oldData and add the new data to it
              // in this case we need to add an id to the newHero
              // because is not the response of the server but the newHero from the form
              data: [...oldQueryData.data, {...newHero, id:id}]
            }
          });
        // we return the previousHeroData to be used in the onError callback
        return {previousHeroData};
      },
      // this function is called if the mutation fails
      // this function receive 3 argument:
      // the error, the variables (in our case {name: xxx, alterEgo: string} without id) and the context ( in our case previousHeroData)
      onError: (_error, _hero, context ) => {
        queryClient.setQueryData('super-heroes', context?.previousHeroData);
      },
      // this function is called if the mutation is successful or failed
      // in this function all we need to do is refetch superHeroes
      onSettled: () => {
        queryClient.invalidateQueries('super-heroes');
      },
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
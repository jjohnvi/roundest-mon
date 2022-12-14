
import { trpc } from '@/utils/trpc'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { useMemo, useState } from 'react'


const Home = () => {

  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {id: first}]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", {id: second}]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null; 
  console.log(firstPokemon.data);

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className="text-2xl text-center">Which Pokémon is Rounder?</div>
      <div className='p-2'/>
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 bg-red-500 flex flex-col items-center"><img src={firstPokemon.data?.sprites.front_default} className="w-full" />
        <div className='text-xl text-center capitalize mt-[-2rem]'>{firstPokemon.data?.name}</div></div>
    <div className='p-8'>Vs</div>
    <div className='w-64 h-64 flex flex-col items-center'><img src={secondPokemon.data?.sprites.front_default} className='w-full' />
    <div className='text-xl text-center capitalize mt-[-2rem]'>{secondPokemon.data?.name}</div></div>
    <div className="p-2"></div>
    </div>
    </div>
  )
}

export default Home


const pokeApi={}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number= pokeDetail.id
    pokemon.name = pokeDetail.name
   
   const types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
   const [type]=types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail =  (pokemon) => {
    return fetch(pokemon.url)
        .then((response)=> response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset=0, limit=5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   
    return fetch(url) //busca a lista na internet
            .then((response) => response.json()) //recebe a resposta e converte para json
            .then((jsonBody)=> jsonBody.results) //recebe o conteudo total e filtra os pokemons
            .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail)) //coneverte a lista de pokemons em uma nova para mais detalhes
            .then((detailRequests)=> Promise.all(detailRequests)) //recebido a lista, aguarda a conclusao para postar o resultado
            .then((pokemonsDetails)=> pokemonsDetails) //lista finalizada
    }

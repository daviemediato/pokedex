import { showList, showDetail } from './navigation.js';
import { listItemTemplate, typeTemplate, detailSection } from './templates.js';
import { capitalize } from './capitalize.js';
import { friendlyFetch } from './data.js';


// pega todos os elementos HTML que serão necessários
const listEl = document.querySelector('#list');
const detailEl = document.querySelector('#detail-section');
const bodyEl = document.querySelector('body');
let avatarImgEl = document.querySelector('#avatar-img').src = `imgs/pokeball.png`
const detailAvatarImgEl = detailEl.querySelector('.item-avatar-img');
const detailNumberEl = detailEl.querySelector('.number');
const detailNameEl = detailEl.querySelector('.name');
const detailTitleEl = detailEl.querySelector('#detail-title');
const detailWeightEl = detailEl.querySelector('#detail-weight');
const detailHeightEl = detailEl.querySelector('#detail-height');
const detailTypesEl = detailEl.querySelector('#detail-types');

// numero de pokemons que queremos na pokedex
const pokemons_number = 15;


// aqui carregamos o total de pokemons
const carregaPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
    const allListItems = document.querySelectorAll('.list-item')
    console.log(allListItems)
    allListItems.forEach(el => el.addEventListener('click', e => selectItem(el)));
}

// aqui "pegamos" cada pokemon pelo seu id e adicionamos ao elemento html da lista
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await friendlyFetch(url)
    const dadosPokemon = {
        number: pokemon.id,
        imageUrl: pokemon.sprites.front_default,
        name: capitalize(pokemon.name),
    }
    const pokemonTemplate = listItemTemplate(dadosPokemon);
    listEl.innerHTML += pokemonTemplate;
}

// aqui selecionamos cada pokemon e desselecionamos
const selectItem = async el => {
    // fazemos o fetch
    const id = el.dataset.id;
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await friendlyFetch(url)
    const pokemonDescricao = await friendlyFetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)

    // criamos os dados
    const dadosPokemon = {
        number: pokemon.id,
        imageUrl: pokemon.sprites.front_default,
        name: capitalize(pokemon.name),
        peso: pokemon.weight,
        altura: pokemon.height,
        tipo: pokemon.types.map(typeInfo => typeInfo.type.name).join(', '),
        descricao: pokemonDescricao.flavor_text_entries.map(info => info.flavor_text[3])
    }

    avatarImgEl = document.querySelector('#avatar-img').src = `${pokemon.sprites.front_default}`


    const detailTemplate = detailSection(dadosPokemon)
    detailEl.innerHTML = detailTemplate
    const backEl = document.querySelector('.back-to-list');
    backEl.addEventListener('click', backToList);

    // desseleciona o pokemon
    const currentItemEl = listEl.querySelector('.list-item.selected');
    if (currentItemEl !== null) {
        currentItemEl.classList.remove('selected');
    }
    el.classList.add('selected');

    showDetail()
}

// aqui voltamos para a lista na pokedex
function backToList() {
    showList();
    avatarImgEl = document.querySelector('#avatar-img').src = `imgs/pokeball.png`
}

// apenas chamamos 
carregaPokemons()


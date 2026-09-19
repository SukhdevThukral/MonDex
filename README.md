# MonDex 

_a v simple and minimal 2-page quickie website to fetch your favourite Pokémon and even compare them :p or make them fight must i say_

<img width="1207" height="617" alt="mondex" src="https://github.com/user-attachments/assets/15a98304-5052-4a60-9139-fb674185b3c5" />

## pages
`index.html` : to browse and search pokemons
`battle.html` : to compare two pokemons and see which ones better based on total stats!

## how this was made

i kept it very simple, used CSS to give it a very basic style, javascript for logic and HTML for the basic skeleton, on top of all this i used the FREE [PokéAPI](https://pokeapi.co/) to get the data for Pokémons

## JS features
### 1. Search - reacts to user + changes page
>Type in the box -> `setTimeout` waits 500ms after you stop typing and then `fetch`es the Pokemon from the API and renders a card

### 2. Type filter buttons - changes content
> you click FIRE / WATER / GRASS etc -> `fetch` pulls that type's Pokémon and re-renders the card grid with images, names, and types.

### 3. Battle Winner - setInterval + DOM update
> you select two Pokémons, click "Choose" on both -> totals their base stats, picks a winner, and setInterval flashes the result every 500ms to make it somewhat attractive :D

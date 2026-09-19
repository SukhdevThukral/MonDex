let searchTime;

document.querySelector('#searchSec button').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (query) fetchPoki(query);
})

searchInput.addEventListener('input', () => {
    clearTimeout(searchTime);
    searchTime = setTimeout(() => {
        const query = searchInput.value.trim().toLowerCase();
        if (query) fetchPoki(query);
    }, 500);
})

async function fetchPoki(name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
}

document.querySelectorAll('.typeBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const type = btn.dataset.type;
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
        const names = data.pokemon.slice(0,8 ).map(p => p.pokemon.name);
        document.getElementById('cardGrid').innerHTML = names.map(n => `<div class="pokeCard">${n}</div>`).join('');
    });
});

function showCard(data) {
    document.getElementById('pokeName').textContent = data.name.toUpperCase();
    document.getElementById('pokeSprite').src = data.sprites.front_default;
}
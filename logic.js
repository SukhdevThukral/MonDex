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
    showCard(data)
}

document.querySelectorAll('.typeBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const type = btn.dataset.type;
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
        const list = data.pokemon.slice(0,8);
        const promises = list.map(p => fetch(p.pokemon.url).then(r=>r.json()));
        const results = await Promise.all(promises);
        renderCard(results);
    });
});

function renderCard(pokemonList) {
    const grid = document.getElementById('cardGrid');
    grid.innerHTML = '';
    pokemonList.forEach(pokemon => {
        const card = document.createElement('div');
        card.className = 'pokeCard';
        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
            <h3>${pokemon.name.toUpperCase()}</h3>
            <p>${pokemon.types.map(t => t.type.name).join(' / ')}</p>
        `;
        grid.appendChild(card);
    });
}


function showCard(data) {
    document.getElementById('filterSection').classList.add('hidden')
    document.getElementById('cardGrid').classList.add('hidden');

    document.getElementById('pokeName').textContent = data.name.toUpperCase();
    document.getElementById('pokeSprite').src = data.sprites.front_default;
    document.getElementById('pokeTypes').textContent = data.types.map(t => t.type.name).join(' / ');
    document.getElementById('pokeStats').innerHTML = data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('');
    document.getElementById('pokemonResult').classList.remove('hidden');

    document.getElementById('backBtn').classList.remove('hidden');
    document.getElementById('pokeCard').addEventListener('click', () => {
        document.getElementById('pokeCard').classList.toggle('flipped');
    });
}

document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('filterSection').classList.remove('hidden');
    document.getElementById('cardGrid').classList.remove('hidden');
    document.getElementById('pokemonResult').classList.add('hidden');
    document.getElementById('backBtn').classList.add('hidden');
    document.getElementById('searchInput').value = '';
});
let pokemon1 = null;
let pokemon2 = null;

let flashInterval;

async function fetchFighters(name, cardId, spriteId, nameId, typeId, statsId) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();

    document.getElementById(spriteId).src = data.sprites.front_default;
    document.getElementById(nameId).textContent = data.name.toUpperCase();
    document.getElementById(typeId).textContent = data.types.map(t => t.type.name).join(' / ');
    document.getElementById(statsId).innerHTML = data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('');
    document.getElementById(cardId).classList.remove('hidden');

    return data;
}

document.getElementById('btn0').addEventListener('click', async () => {
    const query = document.getElementById('input0').value.trim().toLowerCase();

    if (query) {
        pokemon1 = await fetchFighters(query, 'card0', 'sprite1', 'name1', 'type1', 'stats0');
        if (pokemon1 && pokemon2){
            showWinner();
        }
    }
})

document.getElementById('btn1').addEventListener('click', async () => {
    const query = document.getElementById('input1').value.trim().toLowerCase();

    if (query) {
        pokemon2 = await fetchFighters(query, 'card1', 'sprite2', 'name2', 'type2', 'stats1');
        if (pokemon1 && pokemon2){
            showWinner();
        }
    }
})

function getTotal(pokemon) {
    return pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
}

function showWinner() {
    clearInterval(flashInterval)

    const total1 = getTotal(pokemon1);
    const total2 = getTotal(pokemon2);

    const winnnerName = total1>total2 ? pokemon1.name.toUpperCase() : total2 > total1 ? pokemon2.name.toUpperCase() : 'DRAW';

    const winnerDiv = document.getElementById('winner');
    winnerDiv.textContent = winnnerName === 'DRAW' ? ' 🤝 DRAW!' : `🏆 ${winnnerName} WINS!!`;
    winnerDiv.classList.remove('hidden');

    let visible = true;
    flashInterval = setInterval(() => {
        winnerDiv.style.opacity = visible ? '0' : '1';
        visible = !visible;
    }, 500);
}
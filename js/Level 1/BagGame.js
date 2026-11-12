// ===== Minijogo da fase 1: "A bolsa da Senhora Flor" =====
// A criança procura 5 objetos dentro da bolsa e leva cada um para a barra de baixo.
//
// Dá para jogar de dois jeitos (assim funciona para todo mundo):
//  - ARRASTANDO o objeto até a barra de baixo, ou
//  - só CLICANDO no objeto (ou apertando Enter nele, usando o Tab).
// Cada objeto certo vale uma estrela. As bolinhas de papel são só enfeite.

const bagGame = document.getElementById('bagGame');
const infoDiv = document.getElementById('info');
const startBtn = document.getElementById('startGame');
const DropZone = document.getElementById('DropZone');

// Só os 5 objetos de verdade (as bolinhas de papel têm a classe "paper")
const itens = document.querySelectorAll('.item:not(.paper)');

// Nome da animação de cada objeto indo para a barra de baixo (veja style-lvl1.css)
const animations = {
    batom: 'batom-found',
    pente: 'pente-found',
    espelho: 'espelho-found',
    chiclete: 'chiclete-found',
    carteira: 'carteira-found'
};

function iniciarJogoBolsa(aoConcluir) {
    let achados = 0;
    let itemArrastado = null;

    bagGame.style.display = 'flex';
    startBtn.focus({ preventScroll: true });

    // Botão "Começar" (também funciona com Enter e Espaço)
    startBtn.addEventListener('click', () => {
        infoDiv.style.display = 'none';
        itens[0].focus({ preventScroll: true });
    });
    startBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            startBtn.click();
        }
    });

    // Arrastar
    DropZone.addEventListener('dragover', (e) => e.preventDefault());
    DropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        if (itemArrastado) encontrar(itemArrastado);
        itemArrastado = null;
    });

    itens.forEach((item) => {
        item.tabIndex = 0;
        item.setAttribute('role', 'button');
        item.addEventListener('dragstart', () => { itemArrastado = item; });
        item.addEventListener('click', () => encontrar(item));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                encontrar(item);
            }
        });
    });

    function encontrar(item) {
        if (item.dataset.achado) return; // já está na barra
        item.dataset.achado = 'sim';
        item.draggable = false;
        item.tabIndex = -1;
        item.style.cursor = 'default';

        const nome = item.classList[1]; // batom, pente, espelho...
        item.style.animation = `${animations[nome]} 1s linear forwards`;
        Estrelas.ganhar('f1-' + nome);
        achados++;

        if (achados === itens.length) {
            setTimeout(() => {
                bagGame.style.display = 'none';
                aoConcluir();
            }, 1300);
        }
    }
}

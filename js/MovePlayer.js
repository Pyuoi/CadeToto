// ===== Movimento do Totó =====
// posX é a posição do Totó em % da largura da tela. Outros arquivos (common.js) olham essa variável.

let posX = 0;
const velocity = 12; // % da tela por segundo (assim a velocidade é igual em qualquer computador)

const dog = document.getElementById('dog-player');

const keys = {};

window.addEventListener('keydown', (k) => {
    keys[k.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (k) => {
    keys[k.key.toLowerCase()] = false;
});

// Se a janela perder o foco com uma tecla apertada, o Totó não fica andando sozinho
window.addEventListener('blur', () => {
    Object.keys(keys).forEach((k) => { keys[k] = false; });
});

let ultimoQuadro = null;

function move(agora) {
    // segundos desde o último quadro (limitado, para não "pular" se a aba ficou parada)
    const dt = ultimoQuadro === null ? 0 : Math.min((agora - ultimoQuadro) / 1000, 0.1);
    ultimoQuadro = agora;

    if (dog.classList.contains('WalkTrue')) {
        const direita = keys['w'] || keys['d'] || keys['arrowright'];
        const esquerda = keys['s'] || keys['a'] || keys['arrowleft'];

        let andando = false;
        if (direita && posX < 85) { posX = Math.min(posX + velocity * dt, 85); dog.style.transform = 'scaleX(1)'; andando = true; }
        if (esquerda && posX > -5) { posX = Math.max(posX - velocity * dt, -5); dog.style.transform = 'scaleX(-1)'; andando = true; }
        dog.style.left = posX + '%';
        dog.classList.toggle('andando', andando); // liga a animação das perninhas
    } else {
        dog.classList.remove('andando');
    }

    requestAnimationFrame(move);
}

requestAnimationFrame(move);

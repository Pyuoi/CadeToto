// ===== Menu de pausa do Cadê ToTó? =====
// Cria o botão ☰ e o menu sozinho: não precisa mexer no HTML além de 2 linhas.

(function () {
    // --- 1. Monta o HTML do menu e joga dentro da página ---
    const botao = document.createElement('button');
    botao.id = 'btn-menu';
    botao.type = 'button';
    botao.textContent = '☰';
    botao.setAttribute('aria-label', 'Abrir menu');

    const menu = document.createElement('div');
    menu.id = 'menu-pausa';
    menu.innerHTML =
        '<div class="menu-caixa" role="dialog" aria-label="Menu de pausa">' +
            '<h2>Pausado</h2>' +
            '<button type="button" id="menu-continuar">Continuar</button>' +
            '<button type="button" id="menu-reiniciar">Reiniciar fase</button>' +
            '<button type="button" id="menu-lobby">Voltar ao lobby</button>' +
        '</div>';

    // Coloca o botão e o menu DENTRO do game-board, para acompanharem o jogo
    // quando a janela é redimensionada.
    const tabuleiro = document.querySelector('.game-board') || document.body;
    if (getComputedStyle(tabuleiro).position === 'static') {
        tabuleiro.style.position = 'relative'; // necessário pro position: absolute funcionar
    }
    tabuleiro.appendChild(botao);
    tabuleiro.appendChild(menu);

    // --- 2. Estado do menu ---
    let pausado = false;
    let musicaEstavaTocando = false;

    // Pega a música ambiente (se existir na página)
    function musica() {
        return document.getElementById('ambientSong');
    }

    function abrirMenu() {
        pausado = true;
        menu.classList.add('aberto');
        document.body.classList.add('pausado');

        const som = musica();
        if (som) {
            musicaEstavaTocando = !som.paused;
            som.pause();
        }

        document.getElementById('menu-continuar').focus();
    }

    function fecharMenu() {
        pausado = false;
        menu.classList.remove('aberto');
        document.body.classList.remove('pausado');

        // Só volta a música se ela estava tocando antes de pausar
        const som = musica();
        if (som && musicaEstavaTocando) {
            som.play();
        }
    }

    // --- 3. Ações dos botões ---
    botao.addEventListener('click', () => {
        pausado ? fecharMenu() : abrirMenu();
    });

    document.getElementById('menu-continuar').addEventListener('click', fecharMenu);

    // Reiniciar = recarrega a fase do começo
    document.getElementById('menu-reiniciar').addEventListener('click', () => {
        location.reload();
    });

    // Lobby = tela inicial do jogo
    document.getElementById('menu-lobby').addEventListener('click', () => {
        location.href = 'index.html';
    });

    // --- 4. Teclado ---
    // Esc abre/fecha o menu. Enquanto pausado, as outras teclas
    // não chegam no jogo (o cachorro não anda por trás do menu).
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            pausado ? fecharMenu() : abrirMenu();
            return;
        }

        if (pausado) {
            const noBotaoDoMenu = e.target.closest && e.target.closest('#menu-pausa');
            // Deixa Tab/Enter/Espaço funcionarem dentro do menu
            if (!noBotaoDoMenu) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        }
    }, true);

    window.addEventListener('keyup', (e) => {
        if (pausado && e.key !== 'Escape') {
            e.stopImmediatePropagation();
        }
    }, true);
})();

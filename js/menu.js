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
            '<button type="button" id="menu-musica"></button>' +
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

    // --- Música ligada/desligada (a escolha fica salva no navegador) ---
    const botaoMusica = menu.querySelector('#menu-musica');

    function lerMudo() {
        try { return localStorage.getItem('toto.mudo') === '1'; } catch (e) { return false; }
    }

    function aplicarMudo(mudo) {
        const som = musica();
        if (som) som.muted = mudo;
        botaoMusica.textContent = mudo ? 'Música: desligada' : 'Música: ligada';
        try { localStorage.setItem('toto.mudo', mudo ? '1' : '0'); } catch (e) { /* tudo bem */ }
    }

    botaoMusica.addEventListener('click', () => {
        const som = musica();
        aplicarMudo(!(som && som.muted));
    });
    aplicarMudo(lerMudo());

    function abrirMenu() {
        pausado = true;
        menu.classList.add('aberto');
        document.body.classList.add('pausado');

        const som = musica();
        if (som) {
            musicaEstavaTocando = !som.paused;
            som.pause();
        }

        menu.querySelector('#menu-continuar').focus();
    }

    function fecharMenu() {
        pausado = false;
        menu.classList.remove('aberto');
        document.body.classList.remove('pausado');

        // Só volta a música se ela estava tocando antes de pausar
        const som = musica();
        if (som && musicaEstavaTocando) {
            som.play().catch(() => {});
        }
    }

    // --- 3. Ações dos botões ---
    botao.addEventListener('click', () => {
        pausado ? fecharMenu() : abrirMenu();
    });

    menu.querySelector('#menu-continuar').addEventListener('click', fecharMenu);

    // Reiniciar = recarrega a fase do começo
    menu.querySelector('#menu-reiniciar').addEventListener('click', () => {
        location.reload();
    });

    // Lobby = tela inicial do jogo
    menu.querySelector('#menu-lobby').addEventListener('click', () => {
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

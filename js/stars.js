// ===== Sistema de estrelas do Cadê ToTó? =====
// Toda vez que a criança faz uma coisa certa, ela ganha uma estrela ⭐.
//
// Regras (pensadas para crianças neurodivergentes):
//  - só ganha, nunca perde: errar não tira estrela
//  - cada estrela tem um "id" e só conta uma vez; por isso reiniciar a fase não dá estrela repetida
//  - as estrelas ficam salvas no navegador (localStorage), então continuam na próxima fase
//
// Uso nas outras partes do jogo:
//   Estrelas.ganhar('f2-rodada1')  -> true se era uma estrela nova
//   Estrelas.total()               -> quantas estrelas já tem
//   Estrelas.daFase('f2')          -> quantas estrelas da fase 2
//   Estrelas.zerar()               -> começa tudo de novo (jogador novo)

const Estrelas = (function () {
    const CHAVE = 'toto.estrelas';

    // Quantas estrelas existem em cada fase (as de cada objeto/rodada/passo + 1 por terminar a fase) (usado no resumo e na tela final)
    const POR_FASE = { f1: 6, f2: 5, f3: 5 };
    const MAXIMO = Object.values(POR_FASE).reduce((a, b) => a + b, 0);

    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // localStorage pode estar bloqueado (janela anônima etc.), então tudo fica dentro de try/catch
    function ler() {
        try {
            const lista = JSON.parse(localStorage.getItem(CHAVE));
            return Array.isArray(lista) ? lista : [];
        } catch (e) {
            return [];
        }
    }

    function salvar() {
        try {
            localStorage.setItem(CHAVE, JSON.stringify(ganhas));
        } catch (e) { /* sem problema: as estrelas valem só nesta página */ }
    }

    let ganhas = ler();
    let hud = null;
    let numero = null;
    let aviso = null;
    let mostrando = 0; // o número que aparece no contador (sobe quando a estrela chega nele)

    function total() {
        return ganhas.length;
    }

    function daFase(fase) {
        return ganhas.filter((id) => id.startsWith(fase + '-')).length;
    }

    // ----- Contador no canto do jogo -----
    function montarHud() {
        const tabuleiro = document.querySelector('.game-board');
        if (!tabuleiro || document.body.dataset.semEstrelas !== undefined) return;

        hud = document.createElement('div');
        hud.className = 'estrelas-hud';
        hud.innerHTML =
            '<span class="estrelas-icone" aria-hidden="true">⭐</span>' +
            '<span class="estrelas-numero" aria-hidden="true"></span>' +
            '<span class="sr-only" aria-live="polite"></span>';
        numero = hud.querySelector('.estrelas-numero');
        aviso = hud.querySelector('.sr-only');
        tabuleiro.appendChild(hud);

        mostrando = total();
        atualizarNumero();
    }

    function atualizarNumero() {
        if (numero) numero.textContent = mostrando;
    }

    function chegou() {
        mostrando = total();
        atualizarNumero();
        if (!hud) return;
        if (!reduzirMovimento) {
            hud.classList.remove('pop');
            void hud.offsetWidth;
            hud.classList.add('pop');
        }
        if (aviso) aviso.textContent = `Você ganhou uma estrela! Agora são ${mostrando}.`;
    }

    // A estrelinha sai do meio da tela e voa até o contador
    function voar() {
        const tabuleiro = document.querySelector('.game-board');
        if (!hud || !tabuleiro || reduzirMovimento) {
            chegou();
            return;
        }
        const estrela = document.createElement('div');
        estrela.className = 'estrela-voo';
        estrela.textContent = '⭐';
        estrela.setAttribute('aria-hidden', 'true');
        tabuleiro.appendChild(estrela);

        let terminou = false;
        const acabar = () => {
            if (terminou) return;
            terminou = true;
            estrela.remove();
            chegou();
        };
        estrela.addEventListener('animationend', acabar);
        setTimeout(acabar, 1400); // garantia, caso a animação não rode
    }

    function ganhar(id) {
        if (ganhas.includes(id)) return false;
        ganhas.push(id);
        salvar();
        voar();
        return true;
    }

    function zerar() {
        ganhas = [];
        salvar();
        mostrando = 0;
        atualizarNumero();
    }

    montarHud();

    return { ganhar, total, daFase, zerar, POR_FASE, MAXIMO };
})();

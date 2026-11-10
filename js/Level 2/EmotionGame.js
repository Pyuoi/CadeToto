// ===== Minijogo da fase 2: "Como o Teo está se sentindo?" =====
// O Teo conta uma situação e a criança escolhe o rostinho que combina.
//
// Decisões de design (pensando em crianças neurodivergentes):
//  - sem tempo e sem pontuação negativa: dá pra errar quantas vezes quiser
//  - a ordem das opções é sempre a mesma (previsível)
//  - cada emoção tem cor + rostinho + palavra escrita
//  - quem controla o ritmo é a criança: só avança quando clica em "Próximo"

const EMOCOES = {
    feliz: { nome: 'Feliz', img: 'imgs/Level2/rosto-feliz.png' },
    triste: { nome: 'Triste', img: 'imgs/Level2/rosto-triste.png' },
    bravo: { nome: 'Bravo', img: 'imgs/Level2/rosto-bravo.png' },
    assustado: { nome: 'Assustado', img: 'imgs/Level2/rosto-assustado.png' }
};

// Cada rodada: o desenho, a frase, as opções (sempre nessa ordem) e a resposta certa.
// "acerto" é o que o jogo diz quando a criança acerta; "dica" aparece quando ela erra.
const RODADAS = [
    {
        cena: 'imgs/Level2/cena-sorvete.png',
        texto: 'O Teo ganhou um sorvete de morango.',
        opcoes: ['feliz', 'triste', 'bravo'],
        certa: 'feliz',
        acerto: 'Isso! Quando a gente ganha uma coisa gostosa, fica feliz.',
        dica: 'Pense: como você se sente quando ganha uma coisa de que gosta?'
    },
    {
        cena: 'imgs/Level2/cena-sorvete-caido.png',
        texto: 'O sorvete do Teo caiu no chão.',
        opcoes: ['feliz', 'triste', 'assustado'],
        certa: 'triste',
        acerto: 'Isso! Ficar triste quando perde uma coisa é normal.',
        dica: 'Pense: o sorvete que ele queria tanto acabou no chão.'
    },
    {
        cena: 'imgs/Level2/cena-carrinho.png',
        texto: 'Um amigo pegou o carrinho do Teo sem pedir.',
        opcoes: ['bravo', 'feliz', 'assustado'],
        certa: 'bravo',
        acerto: 'Isso! Tudo bem ficar bravo. O Teo pode respirar fundo e pedir o carrinho de volta.',
        dica: 'Pense: como a gente fica quando alguém pega algo nosso sem pedir?'
    },
    {
        cena: 'imgs/Level2/cena-trovao.png',
        texto: 'De repente, o Teo ouviu um trovão bem forte.',
        opcoes: ['triste', 'assustado', 'feliz'],
        certa: 'assustado',
        acerto: 'Isso! Um barulho forte pode dar susto. Tapar os ouvidos ajuda.',
        dica: 'Pense: como a gente se sente com um barulho muito forte e inesperado?'
    }
];

function iniciarJogoEmocoes(aoConcluir) {
    const jogo = document.getElementById('jogo-emocoes');
    const painel = document.getElementById('painel-emocoes');
    const btnComecar = document.getElementById('btn-comecar-emocoes');
    const progresso = document.getElementById('progresso-emocoes');
    const cenaIcone = document.getElementById('cena-icone');
    const cenaTexto = document.getElementById('cena-texto');
    const opcoesDiv = document.getElementById('opcoes');
    const feedback = document.getElementById('feedback-emocoes');
    const btnContinuar = document.getElementById('btn-continuar-emocoes');

    let rodada = 0;
    let respondida = false;

    abrirJogo(jogo);
    btnComecar.focus({ preventScroll: true });

    btnComecar.addEventListener('click', () => {
        painel.classList.add('jogando');
        mostrarRodada();
    });

    btnContinuar.addEventListener('click', () => {
        rodada++;
        if (rodada < RODADAS.length) {
            mostrarRodada();
        } else {
            fecharJogo(jogo);
            aoConcluir();
        }
    });

    function desenharProgresso() {
        progresso.innerHTML = '';
        RODADAS.forEach((_, i) => {
            const ponto = document.createElement('span');
            ponto.className = 'ponto' + (i < rodada ? ' feito' : '') + (i === rodada ? ' atual' : '');
            progresso.appendChild(ponto);
        });
        progresso.setAttribute('aria-label', `Rodada ${rodada + 1} de ${RODADAS.length}`);
    }

    function mostrarRodada() {
        const r = RODADAS[rodada];
        respondida = false;

        desenharProgresso();
        cenaIcone.src = r.cena;
        cenaTexto.textContent = r.texto;
        feedback.textContent = '';
        feedback.classList.remove('bom');
        btnContinuar.classList.remove('pronto');

        opcoesDiv.innerHTML = '';
        r.opcoes.forEach((chave) => {
            const emocao = EMOCOES[chave];
            const botao = document.createElement('button');
            botao.type = 'button';
            botao.className = 'opcao';
            botao.dataset.emocao = chave;
            botao.innerHTML = `<img src="${emocao.img}" alt=""><span>${emocao.nome}</span>`;
            botao.addEventListener('click', () => escolher(botao, chave));
            opcoesDiv.appendChild(botao);
        });
    }

    function escolher(botao, chave) {
        if (respondida) return;
        const r = RODADAS[rodada];

        if (chave === r.certa) {
            respondida = true;
            botao.classList.add('certa');
            opcoesDiv.querySelectorAll('.opcao').forEach((b) => { b.disabled = true; });
            feedback.textContent = r.acerto;
            feedback.classList.add('bom');
            btnContinuar.classList.add('pronto');
            btnContinuar.focus({ preventScroll: true });
        } else {
            // Errou: sem barulho, sem vermelho. A opção só esmaece e a criança tenta de novo.
            botao.classList.add('errada');
            botao.disabled = true;
            feedback.classList.remove('bom');
            feedback.textContent = 'Quase! ' + r.dica;
        }
    }
}

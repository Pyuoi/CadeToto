// ===== Funções compartilhadas das fases 2 e 3 =====
// Aqui ficam as partes que se repetem em toda fase:
//   tutorial -> andar até o personagem -> zoom -> conversa -> minijogo -> conversa final -> próxima fase
// Cada fase só precisa chamar iniciarFase() com a sua configuração (veja level2.js e level3.js).
//
// Obs.: o MovePlayer.js (carregado antes) já cria as variáveis globais "dog" e "posX".

const ambientSong = document.getElementById('ambientSong');
const fade = document.getElementById('fade');
const background = document.getElementById('background');
const npc = document.getElementById('npc');
const seta = document.getElementById('seta');

const DivTutorial = document.getElementById('DivTutorial');
const CloseTutorial = document.getElementById('CloseTutorial');

const balao = document.getElementById('balao');
const fala = document.getElementById('fala');
const btnProximo = document.getElementById('btn-proximo');
const btnProximoImg = btnProximo.querySelector('img');

const IMG_PROXIMO = 'imgs/nextButton.png';
const IMG_COMECAR = 'imgs/BagGame/startbutton.png';

// Se a pessoa pediu "menos movimento" no sistema, o texto aparece de uma vez e sem a transição preta
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// ---------- Transição (o círculo preto) ----------
// "aoMeio" roda quando a tela está toda preta, então a troca de cenário não aparece.
function fazerTransicao(aoMeio) {
    if (reduzirMovimento) {
        aoMeio();
        return;
    }
    fade.classList.remove('active');
    void fade.offsetWidth; // reinicia a animação
    fade.classList.add('active');
    setTimeout(aoMeio, 450);
}


// ---------- Balão de fala com efeito de digitação ----------
let timerDigitando = null;
let digitando = false;
let textoAtual = '';

let falasAtuais = [];
let indiceFala = 0;
let aoFimDasFalas = null;
let imagemUltimoBotao = IMG_PROXIMO;
let dialogoAtivo = false;

function digitar(texto) {
    textoAtual = texto;
    fala.textContent = '';
    digitando = true;
    btnProximo.style.visibility = 'hidden';
    clearTimeout(timerDigitando);

    if (reduzirMovimento) {
        terminarDigitacao();
        return;
    }

    let i = 0;
    (function passo() {
        i++;
        fala.textContent = texto.slice(0, i);
        if (i >= texto.length) {
            terminarDigitacao();
        } else {
            timerDigitando = setTimeout(passo, 35);
        }
    })();
}

function terminarDigitacao() {
    clearTimeout(timerDigitando);
    fala.textContent = textoAtual;
    digitando = false;
    btnProximo.style.visibility = 'visible';
    btnProximo.focus({ preventScroll: true }); // assim Enter/Espaço também avançam
}

function mostrarFalaAtual() {
    const ehUltima = indiceFala === falasAtuais.length - 1;
    btnProximoImg.src = ehUltima ? imagemUltimoBotao : IMG_PROXIMO;
    btnProximoImg.alt = ehUltima && imagemUltimoBotao === IMG_COMECAR ? 'Começar' : 'Próximo';
    digitar(falasAtuais[indiceFala]);
}

// falas: lista de textos. aoFim: o que fazer depois da última fala.
// imagemFinal: imagem do botão na última fala (por exemplo "Começar").
function iniciarDialogo(falas, aoFim, imagemFinal) {
    falasAtuais = falas;
    indiceFala = 0;
    aoFimDasFalas = aoFim;
    imagemUltimoBotao = imagemFinal || IMG_PROXIMO;
    dialogoAtivo = true;
    balao.classList.add('visivel');
    mostrarFalaAtual();
}

function proximaFala() {
    if (!dialogoAtivo) return;

    // Clicou durante a digitação: mostra o texto inteiro na hora
    if (digitando) {
        terminarDigitacao();
        return;
    }

    if (indiceFala < falasAtuais.length - 1) {
        indiceFala++;
        mostrarFalaAtual();
    } else {
        dialogoAtivo = false;
        balao.classList.remove('visivel');
        aoFimDasFalas();
    }
}

btnProximo.addEventListener('click', proximaFala);
fala.addEventListener('click', () => {
    if (digitando) terminarDigitacao();
});

// Enter ou Espaço avançam a conversa (quando nenhum botão está em foco)
window.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && dialogoAtivo && document.activeElement === document.body) {
        e.preventDefault();
        proximaFala();
    }
});


// ---------- Abrir e fechar a tela do minijogo ----------
function abrirJogo(elemento) {
    elemento.classList.add('aberto');
}

function fecharJogo(elemento) {
    elemento.classList.remove('aberto');
}


// ---------- Resumo de estrelas no fim da fase ----------
// A criança vê quantas estrelas ganhou e clica em "Próximo" quando quiser (sem tempo).
function mostrarResumo(fase, aoContinuar) {
    Estrelas.ganhar(fase + '-fim'); // estrela de bônus por terminar a fase
    const ganhas = Estrelas.daFase(fase);
    const total = Estrelas.POR_FASE[fase];

    const resumo = document.createElement('div');
    resumo.className = 'resumo aberto';
    resumo.setAttribute('role', 'dialog');
    resumo.setAttribute('aria-label', 'Fase completa');

    let estrelas = '';
    for (let i = 0; i < total; i++) {
        estrelas += i < ganhas
            ? `<span class="brilha" style="animation-delay:${i * 0.15}s">⭐</span>`
            : '<span class="vazia">⭐</span>';
    }

    const mensagem = ganhas === total
        ? 'Você pegou todas as estrelas desta fase!'
        : 'Você pegou ' + ganhas + ' de ' + total + ' estrelas. Muito bem!';

    resumo.innerHTML =
        '<div class="resumo-caixa">' +
            '<h2>Fase completa!</h2>' +
            '<div class="resumo-estrelas" aria-hidden="true">' + estrelas + '</div>' +
            '<p>' + mensagem + '</p>' +
            '<button type="button" class="btn-img"><img src="' + IMG_PROXIMO + '" alt="Próximo"></button>' +
        '</div>';

    document.querySelector('.game-board').appendChild(resumo);
    const botao = resumo.querySelector('button');
    botao.focus({ preventScroll: true });
    botao.addEventListener('click', () => {
        resumo.remove();
        aoContinuar();
    });
}


// ---------- O fluxo completo de uma fase ----------
// config = {
//   gatilho: { min, max },       faixa de posX (em %) onde o Totó "encontra" o personagem
//   fundoZoom: 'imgs/...png',    cenário aproximado da conversa
//   falasInicio: [ ... ],        conversa antes do minijogo
//   iniciarJogo: function(aoConcluir) {...},   começa o minijogo; chama aoConcluir() quando acabar
//   falasFim: [ ... ],           conversa depois do minijogo
//   fase: 'f2',                  id da fase nas estrelas (veja stars.js); mostra o resumo no fim
//   cachorroZoom: { width, bottom, left },   (opcional) onde o Totó fica no cenário aproximado
//   proximaPagina: 'level3.html' para onde ir no final
// }
function iniciarFase(config) {
    // O botão "Começar" do tutorial também funciona com o teclado (Tab + Enter)
    CloseTutorial.setAttribute('role', 'button');
    CloseTutorial.tabIndex = 0;
    CloseTutorial.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            CloseTutorial.click();
        }
    });

    // Fechar o tutorial libera o movimento e começa a música
    // (o navegador só deixa tocar som depois de um clique, por isso é aqui)
    CloseTutorial.addEventListener('click', () => {
        DivTutorial.style.display = 'none';
        dog.classList.add('WalkTrue');
        ambientSong.volume = 0.2;
        ambientSong.play().catch(() => {});
    });

    // Fica olhando a posição do Totó até ele chegar perto do personagem
    let encontrou = false;
    function vigiarEncontro() {
        if (encontrou) return;
        if (posX >= config.gatilho.min && posX <= config.gatilho.max) {
            encontrou = true;
            encontrarPersonagem();
            return;
        }
        requestAnimationFrame(vigiarEncontro);
    }
    vigiarEncontro();

    function encontrarPersonagem() {
        dog.classList.remove('WalkTrue');
        seta.style.display = 'none';

        fazerTransicao(() => {
            background.src = config.fundoZoom;
            npc.style.opacity = 0; // o personagem já está desenhado no cenário aproximado

            // O Totó fica de frente pro personagem, com as patas no mesmo chão dele
            dog.style.transform = 'scaleX(1)';
            const lugar = config.cachorroZoom || { width: '25%', bottom: '22.5%', left: '14%' };
            dog.style.width = lugar.width;
            dog.style.bottom = lugar.bottom;
            dog.style.left = lugar.left;

            iniciarDialogo(config.falasInicio, () => {
                config.iniciarJogo(terminarJogo);
            }, IMG_COMECAR);
        });
    }

    function terminarJogo() {
        iniciarDialogo(config.falasFim, () => {
            const ir = () => fazerTransicao(() => {
                window.location.href = config.proximaPagina;
            });
            if (config.fase) mostrarResumo(config.fase, ir);
            else ir();
        });
    }
}

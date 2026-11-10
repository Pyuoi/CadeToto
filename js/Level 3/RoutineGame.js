// ===== Minijogo da fase 3: "A rotina do dono do Totó" =====
// A criança coloca 4 cartões na ordem certa: primeiro, depois, em seguida, por fim.
// Isso é parecido com as "rotinas visuais" que muita gente neurodivergente usa no dia a dia.
//
// Decisões de design:
//  - o jogo pergunta UM passo de cada vez ("O que ele faz primeiro?"), então a criança
//    nunca precisa montar tudo de uma vez
//  - o lugar que está "valendo" fica destacado em azul
//  - errar não tem castigo: o cartão só esmaece um pouquinho e aparece uma dica
//  - usa só clique (nada de arrastar), então também funciona com teclado (Tab + Enter)

// Os passos na ORDEM CERTA (do primeiro ao último)
const PASSOS = [
    {
        id: 'acordar',
        nome: 'Acordar',
        img: 'imgs/Level3/passo-acordar.png',
        etiqueta: 'Primeiro',
        pergunta: 'O que ele faz PRIMEIRO?',
        acerto: 'Isso! Primeiro ele acorda.',
        dica: 'Pense: o que a gente faz assim que o dia começa?'
    },
    {
        id: 'cafe',
        nome: 'Tomar café',
        img: 'imgs/Level3/passo-cafe.png',
        etiqueta: 'Depois',
        pergunta: 'E DEPOIS, o que ele faz?',
        acerto: 'Isso! Depois ele toma o café da manhã.',
        dica: 'Pense: depois de acordar, a barriga costuma pedir comida.'
    },
    {
        id: 'coleira',
        nome: 'Colocar a coleira',
        img: 'imgs/Level3/passo-coleira.png',
        etiqueta: 'Em seguida',
        pergunta: 'EM SEGUIDA, o que vem?',
        acerto: 'Isso! Em seguida ele coloca a coleira no Totó.',
        dica: 'Pense: antes de sair para passear, o Totó precisa estar com a coleira.'
    },
    {
        id: 'passeio',
        nome: 'Passear',
        img: 'imgs/Level3/passo-passeio.png',
        etiqueta: 'Por fim',
        pergunta: 'E POR FIM, o que eles fazem?',
        acerto: 'Isso! Por fim, eles vão passear juntos.',
        dica: 'Pense: falta só a parte que o Totó mais gosta!'
    }
];

// Como os cartões aparecem embaralhados (sempre nessa mesma ordem, para ser previsível)
const ORDEM_DAS_CARTAS = ['cafe', 'passeio', 'acordar', 'coleira'];

function iniciarJogoRotina(aoConcluir) {
    const jogo = document.getElementById('jogo-rotina');
    const painel = document.getElementById('painel-rotina');
    const btnComecar = document.getElementById('btn-comecar-rotina');
    const pergunta = document.getElementById('pergunta-rotina');
    const trilho = document.getElementById('trilho');
    const cartasDiv = document.getElementById('cartas');
    const feedback = document.getElementById('feedback-rotina');
    const btnContinuar = document.getElementById('btn-continuar-rotina');

    let passoAtual = 0; // qual vaga está "valendo" agora (0 a 3)

    abrirJogo(jogo);
    btnComecar.focus({ preventScroll: true });

    // Monta as 4 vagas (Primeiro, Depois, Em seguida, Por fim)
    const vagas = PASSOS.map((passo, i) => {
        const caixa = document.createElement('div');
        caixa.className = 'vaga-caixa';
        caixa.innerHTML = `<span>${i + 1}. ${passo.etiqueta}</span>`;
        const vaga = document.createElement('div');
        vaga.className = 'vaga';
        caixa.appendChild(vaga);
        trilho.appendChild(caixa);
        return vaga;
    });

    // Monta os cartões embaralhados
    ORDEM_DAS_CARTAS.forEach((id) => {
        const passo = PASSOS.find((p) => p.id === id);
        const carta = document.createElement('button');
        carta.type = 'button';
        carta.className = 'carta';
        carta.innerHTML = `<img src="${passo.img}" alt=""><span>${passo.nome}</span>`;
        carta.addEventListener('click', () => escolher(carta, passo));
        cartasDiv.appendChild(carta);
    });

    btnComecar.addEventListener('click', () => {
        painel.classList.add('jogando');
        mostrarPasso();
    });

    btnContinuar.addEventListener('click', () => {
        fecharJogo(jogo);
        aoConcluir();
    });

    function mostrarPasso() {
        vagas.forEach((v, i) => v.classList.toggle('atual', i === passoAtual));
        pergunta.textContent = PASSOS[passoAtual].pergunta;
    }

    function escolher(carta, passo) {
        if (passoAtual >= PASSOS.length) return;

        if (passo === PASSOS[passoAtual]) {
            // Acertou: o cartão vai para a vaga
            vagas[passoAtual].appendChild(carta);
            vagas[passoAtual].classList.add('preenchida');
            carta.classList.add('colocada');
            carta.classList.remove('errada');
            carta.disabled = true;
            feedback.textContent = passo.acerto;
            feedback.classList.add('bom');

            passoAtual++;
            // Tira os cartões que sobraram do "esmaecido" para a próxima pergunta
            cartasDiv.querySelectorAll('.carta').forEach((c) => c.classList.remove('errada'));

            if (passoAtual < PASSOS.length) {
                mostrarPasso();
            } else {
                // Terminou a rotina
                vagas.forEach((v) => v.classList.remove('atual'));
                pergunta.textContent = 'Rotina completa! 🎉';
                feedback.textContent = 'Muito bem! Você colocou a rotina toda em ordem.';
                btnContinuar.classList.add('pronto');
                btnContinuar.focus({ preventScroll: true });
            }
        } else {
            // Errou: sem barulho, sem vermelho. O cartão esmaece e aparece uma dica.
            carta.classList.add('errada');
            feedback.classList.remove('bom');
            feedback.textContent = 'Hmm, será que isso vem agora? ' + PASSOS[passoAtual].dica;
        }
    }
}

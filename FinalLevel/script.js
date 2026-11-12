// ===== Tela final: estrelas -> créditos -> nota =====

const telaEstrelas = document.getElementById('tela-estrelas');
const telaCreditos = document.getElementById('tela-creditos');
const form = document.getElementById('form');

const creditos = document.getElementById('texts');
const btnCreditos = document.getElementById('btn-creditos');
const btnPular = document.getElementById('btn-pular');

const btn = document.getElementById('btn');
const respost = document.getElementById('respost');
const botoesNotas = document.querySelectorAll('.nota');
const btnDeNovo = document.getElementById('btn-de-novo');

function mostrar(tela) {
    [telaEstrelas, telaCreditos, form].forEach((t) => t.classList.toggle('visivel', t === tela));
}


// ---------- 1) Estrelas ----------
(function montarEstrelas() {
    const ganhas = Estrelas.total();
    const maximo = Estrelas.MAXIMO;

    let html = '';
    for (let i = 0; i < maximo; i++) {
        html += i < ganhas
            ? `<span class="brilha" style="animation-delay:${i * 0.12}s">⭐</span>`
            : '<span class="vazia">⭐</span>';
    }
    document.getElementById('estrelas-linha').innerHTML = html;

    let texto;
    if (ganhas >= maximo) texto = `Você pegou todas as ${maximo} estrelas! Parabéns!`;
    else if (ganhas === 0) texto = 'Você chegou ao final! Dá para brincar de novo e pegar estrelas.';
    else texto = `Você pegou ${ganhas} de ${maximo} estrelas. Muito bem!`;
    document.getElementById('estrelas-texto').textContent = texto;

    mostrar(telaEstrelas);
    btnCreditos.focus();
})();


// ---------- 2) Créditos ----------
btnCreditos.addEventListener('click', () => {
    mostrar(telaCreditos);
    btnPular.focus();
});

// Os créditos sobem uma vez só; quando terminam (ou quando a pessoa pula) vem a nota
creditos.addEventListener('animationend', irParaNota);
btnPular.addEventListener('click', irParaNota);

function irParaNota() {
    mostrar(form);
    botoesNotas[0].focus();
}


// ---------- 3) Nota ----------
let notaEscolhida = null;

botoesNotas.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesNotas.forEach((b) => b.setAttribute('aria-pressed', String(b === botao)));
        notaEscolhida = Number(botao.textContent);
        btn.disabled = false;
    });
});

function comentario(nota) {
    if (nota < 60) return 'Poxa professor! Merecemos mais hein 😭';
    if (nota <= 69) return 'Nota nem fede nem cheira né professor! Vamos aumentar isso aí!? 😅';
    if (nota <= 75) return 'Tá melhorando... mas ainda cabe uns pontinhos extras, né professor? 👀';
    if (nota <= 85) return 'Agora sim estamos conversando! Mas arredondar pra 100 nunca machucou ninguém. 😂';
    if (nota <= 95) return 'Professor, essa nota tá bonita... mas um 100 ficaria muito mais elegante. 😎';
    if (nota <= 99) return 'Faltou só aquele 1 pontinho de consideração, professor. 😭';
    if (nota === 100) return 'Aí sim! Professor, você é uma máquina de dar nota! 🏆';
    return 'Professor, inventou nota nova foi? 🤨';
}

// Um único "ouvinte" no Enviar (antes ele era adicionado de novo a cada clique numa nota)
btn.addEventListener('click', () => {
    if (notaEscolhida === null) return;
    respost.textContent = comentario(notaEscolhida);
});


// ---------- Jogar de novo (jogador novo: zera as estrelas) ----------
btnDeNovo.addEventListener('click', () => {
    Estrelas.zerar();
    location.href = '../index.html';
});

// ===== Fase 1: a Senhora Flor e a bolsa =====
// Só a história (as falas) e a configuração da fase ficam aqui.
// O passeio do Totó, o zoom e a conversa estão no common.js, e o minijogo está no BagGame.js.

iniciarFase({
    // Faixa de posição (em %) em que o Totó "encontra" a Senhora Flor
    gatilho: { min: 31, max: 43 },

    fundoZoom: 'imgs/bag-girl-zoom.png',
    cachorroZoom: { width: '40%', bottom: '5%', left: '12%' },

    falasInicio: [
        'Olá, cachorrinho!',
        'Você pode me ajudar? Estou procurando alguns objetos que caíram na minha bolsa.',
        'Será que consegue encontrá-los para mim?'
    ],

    iniciarJogo: iniciarJogoBolsa,

    falasFim: [
        'Muito obrigado, cachorrinho! Com a sua ajuda eu consegui achar meus pertences!',
        'Inclusive, seu dono estava te procurando, ele acabou de passar aqui.',
        'Ele foi reto e virou a próxima direita.'
    ],

    fase: 'f1',

    proximaPagina: 'level2.html'
});

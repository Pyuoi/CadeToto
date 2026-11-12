// ===== Fase 2: o Teo e os sentimentos =====
// Aqui só ficam a história (as falas) e a configuração da fase.
// O resto do fluxo está no common.js e o minijogo está no EmotionGame.js.

iniciarFase({
    // Faixa de posição (em %) em que o Totó "encontra" o Teo
    gatilho: { min: 42, max: 54 },

    fundoZoom: 'imgs/Level2/teo-zoom.png',

    falasInicio: [
        'Oi, cachorrinho! Eu sou o Teo.',
        'Hoje eu senti um monte de coisas diferentes e fiquei confuso.',
        'Você me ajuda a descobrir o nome de cada sentimento? É só olhar os rostinhos!'
    ],

    iniciarJogo: iniciarJogoEmocoes,

    falasFim: [
        'Obrigado, Totó! Agora eu sei dar nome ao que eu sinto.',
        'Ah! Eu vi um moço procurando um cachorrinho laranja. Ele parecia bem preocupado.',
        'Ele foi na direção da padaria da Dona Rosa. Corre lá!'
    ],

    fase: 'f2',

    proximaPagina: 'level3.html'
});

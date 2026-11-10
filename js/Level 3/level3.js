// ===== Fase 3: a Dona Rosa e a rotina =====
// Aqui só ficam a história (as falas) e a configuração da fase.
// O resto do fluxo está no common.js e o minijogo está no RoutineGame.js.

iniciarFase({
    // Faixa de posição (em %) em que o Totó "encontra" a Dona Rosa
    gatilho: { min: 46, max: 58 },

    fundoZoom: 'imgs/Level3/rosa-zoom.png',

    falasInicio: [
        'Bom dia, cachorrinho! Eu sou a Dona Rosa, a padeira.',
        'O dono de um cachorrinho laranja passa aqui todo dia e me conta a rotina dele.',
        'Mas meus cartões se embaralharam! Me ajuda a colocar tudo em ordem? Aí eu lembro pra onde ele foi.'
    ],

    iniciarJogo: iniciarJogoRotina,

    falasFim: [
        'Isso mesmo! Agora eu lembrei de tudo!',
        'Hoje ele disse que ia esperar por você ali, na esquina da praça.',
        'Corre, Totó! Seu dono está te esperando!'
    ],

    // Depois da última fala vai para a tela de créditos
    proximaPagina: 'FinalLevel/final.html'
});

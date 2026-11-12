# Cadê Totó
🐶 Cadê ToTó? é um jogo 2D em pixel art feito com HTML, CSS e JavaScript. Ajude Totó a encontrar seu verdadeiro dono cumprindo missões, resolvendo desafios e ajudando personagens pelo caminho. Cada pista o aproxima um pouco mais de casa.


## ⭐ Estrelas (recompensas)

Cada coisa certa vale uma estrela: 5 na fase 1 (objetos da bolsa), 4 na fase 2 (emoções) e 4 na fase 3 (rotina), somando 13.
- Só ganha, nunca perde: errar não tira estrela e não tem tempo.
- Cada estrela vale uma vez só (reiniciar a fase não repete a estrela) e fica salva no navegador.
- O código está em `js/stars.js` e `css/estrelas.css`. Para dar uma estrela: `Estrelas.ganhar('f2-minha-estrela')` (e some o novo total em `POR_FASE`).
- No fim de cada fase aparece o resumo de estrelas, e a tela final mostra o total. "Jogar de novo" zera as estrelas.

## Como ficam os arquivos

- `js/common.js`: o fluxo de toda fase (andar, zoom, conversa, minijogo, resumo). Cada fase só chama `iniciarFase({...})`.
- `js/Level N/`: as falas da fase e o minijogo dela.
- `js/menu.js`: menu de pausa (Esc), com botão de música.

const readline = require('readline');
const Chance = require('chance');
let chance = new Chance();

// Variáveis para unidades
let playerUnidades = {
  cubinhos: 0,
  barras: 0,
  placas: 0
};

let computerUnidades = {
  cubinhos: 0,
  barras: 0,
  placas: 0
};

// Função para trocar unidades
function trocarUnidade(jogador) {
  if (jogador.cubinhos >= 10) {
    jogador.cubinhos -= 10;
    jogador.barras++;
  }
  if (jogador.barras >= 10) {
    jogador.barras -= 10;
    jogador.placas++;
  }
}

// Função para iniciar o jogo
function startGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Pressione qualquer tecla para gerar um número: ', (answer) => {
    rl.close();

    // Gera número aleatório do jogador
    const playerChoice = chance.integer({ min: 0, max: 9 });
    playerUnidades.cubinhos += playerChoice;
    trocarUnidade(playerUnidades);

    // Gera número aleatório do computador
    const computerChoice = chance.integer({ min: 0, max: 9 });
    computerUnidades.cubinhos += computerChoice;
    trocarUnidade(computerUnidades);

    // Exibe quantidades de unidades
    console.log(`Jogador: Cubinhos: ${playerUnidades.cubinhos}, Barras: ${playerUnidades.barras}, Placas: ${playerUnidades.placas}`);
    console.log(`Computador: Cubinhos: ${computerUnidades.cubinhos}, Barras: ${computerUnidades.barras}, Placas: ${computerUnidades.placas}`);

    // Se o jogador ou o computador ainda não ganhou, jogue outra rodada
    if (playerUnidades.placas < 1 && computerUnidades.placas < 1) {
      startGame();
    } else if (playerUnidades.placas >= 1) {
      console.log('Você venceu!');
    } else {
      console.log('O computador venceu!');
    }
  });
}

// Inicia o jogo
startGame();

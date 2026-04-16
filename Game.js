
let celulas = document.querySelectorAll(".cell"); //get cells
let textoStatus = document.getElementById("status"); // whos time
let botaoReiniciar = document.getElementById("reset"); //restart button
let textoPlacarX = document.getElementById("sx"); // X point
let textoPlacarO = document.getElementById("so"); // 0 point


let jogadorAtual = "X"; 
let jogoAtivo = true;
let placarX = 0;
let placarO = 0;
let tabuleiro = ["", "", "", "", "", "", "", "", ""];


//getting click
for (let i = 0; i < celulas.length; i++) {
    celulas[i].addEventListener("click", function() {
        clicouNaCelula(celulas[i], i);
    });
}

//restart button
botaoReiniciar.addEventListener("click", reiniciarJogo);

//single click on cell
function clicouNaCelula(celulaClicada, indice) {

    if (tabuleiro[indice] !== "" || jogoAtivo === false) {
        return; 
    }

    tabuleiro[indice] = jogadorAtual;
    celulaClicada.innerText = jogadorAtual;

    verificarVencedor();
}

//verify winner
function verificarVencedor() {
    let ganhou = false;

    //conditons for winning
    let combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < combinacoes.length; i++) {
        let pos1 = combinacoes[i][0];
        let pos2 = combinacoes[i][1];
        let pos3 = combinacoes[i][2];

        let espaco1 = tabuleiro[pos1];
        let espaco2 = tabuleiro[pos2];
        let espaco3 = tabuleiro[pos3];

        if (espaco1 === "" || espaco2 === "" || espaco3 === "") {
            continue;
        }

        //checking if all 3 spaces are the same
        if (espaco1 === espaco2 && espaco2 === espaco3) {
            ganhou = true;
            break;
        }
    }

    //winner
    if (ganhou === true) {
        textoStatus.innerText = "Player " + jogadorAtual + " Wins!";
        jogoAtivo = false; //stop the game

        //update score
        if (jogadorAtual === "X") {
            placarX = placarX + 1;
            textoPlacarX.innerText = placarX;
        } else {
            placarO = placarO + 1;
            textoPlacarO.innerText = placarO;
        }
        return;
    }

    // no winner, check for draw
    let empatou = true;
    for (let i = 0; i < tabuleiro.length; i++) {
        if (tabuleiro[i] === "") {
            empatou = false;
        }
    }

    if (empatou === true) {
        textoStatus.innerText = "Draw";
        return;
    }

    // no winner
    // change player
    if (jogadorAtual === "X") {
        jogadorAtual = "O";
    } else {
        jogadorAtual = "X";
    }
    
    //
    textoStatus.innerText = "Player " + jogadorAtual + "'s turn";
}

//for restarting the game
function reiniciarJogo() {
    //reset all variables
    jogadorAtual = "X";
    jogoAtivo = true;
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    textoStatus.innerText = "Player " + jogadorAtual + "'s turn";

    //clean the board
    for (let i = 0; i < celulas.length; i++) {
        celulas[i].innerText = "";
    }
}
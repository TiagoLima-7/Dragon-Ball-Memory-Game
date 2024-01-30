//Initialisation des variables
var erreurs = 0;
var listeCartes = [
    "bulma",
    "buu",
    "dragon",
    "frieza",
    "goku",
    "gotenks",
    "krillin",
    "master-buten",
    "picollo",
    "vegeta"
]

var cardSet;
var board = [];
var lignes = 4;
var collones = 5;

var card1Selected;
var card2Selected;

var hrs = 0;
var min = 0;
var sec = 0;

var pairesTrouves = 0;
var pairesTotales  = listeCartes.length;
var gameWon = false;

window.onload = function() {
    shuffleCards();
    startGame();

}

function shuffleCards() {
    //On a besoin de 2 exemplaires de chaque carte
    cardSet = listeCartes.concat(listeCartes);
    console.log(cardSet);

    for(let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length) // random index du tableau cardSet

        temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;

    }
    console.log(cardSet);
}

function startGame() {
    //construction de la board
    for(let r = 0; r < lignes; r++){
        let row = [];
        for (let c = 0; c < collones; c++){
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "./img/" + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard)
            document.getElementById("board").append(card);

        }
        board.push(row);
    }
    console.log(board);
    setTimeout(cacherCartes, 2500);

}

function cacherCartes() {
    for(let r = 0; r < lignes; r++){
        for(let c = 0; c < collones; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "./img/card-back-2.jpg";
        }
    }
    timer();
}

function selectCard() {
    if(this.src.includes("card-back")) {
        if(!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1 -> ["0","1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "./img/" + board[r][c] + ".png";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
    
            let coords = card2Selected.id.split("-"); //"0-1 -> ["0","1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "./img/" + board[r][c] + ".png";
            setTimeout(update,1000);
        }
    }
}

function verificationVictoire() {
    if(pairesTrouves === pairesTotales) {
        gameWon = true;
        //alert("Félicitations. Vous avez gagné!!!");
        document.querySelector('.modal').style.display = "flex";
    } 
}

const closeModal = document.querySelector('.modalContenu button');

closeModal.addEventListener('click', function () {
    document.querySelector('.modal').style.display = "none";
})

function update() {
    if(card1Selected.src != card2Selected.src) {
        card1Selected.src = "./img/card-back-2.jpg";
        card2Selected.src = "./img/card-back-2.jpg";

        erreurs+=1;
        document.getElementById("erreurs").innerText = erreurs.toString();
    } else {
    pairesTrouves += 1;
    verificationVictoire();
    }

    card1Selected = null;
    card2Selected = null;
}

function temps() {
    sec++;
    if (sec >=60) {
        sec=0;
        min++;
        if(min >=60) {
            min=0;
            hrs++;
        }
    }
}

function add() {
    temps();
    document.getElementById("chrono").innerText = ((hrs > 9 ? hrs : '0' + hrs) + ":" + (min > 9 ? min : '0' + min) + ":" + (sec > 9 ? sec : "0" + sec))
    timer();
}

function timer() {
    if(!gameWon){
        t = setTimeout(add, 1000);
    } else {
        clearTimeout(t);
    }
}


//Gestionnaire Audio
// var audio = document.createElement('audio');

// audio.src = "./battle.mp3";
// audio.type = "audio/mp3";

// audio.controls = true;
// audio.autoplay = true;

// document.querySelector(".stats").appendChild(audio);
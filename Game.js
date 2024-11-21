
/* Sélection d'éléments DOM */
const cells = document.querySelectorAll('.cell')
const Turn = document.querySelector('.turn')
const ResetBtn = document.querySelector('.reset')
const Player1score = document.querySelector('.score-1')
const Player2score = document.querySelector('.score-2')
const draws = document.querySelector('.draw')
const MessageOverlay = document.getElementById('overlay')
const Messagecontent = document.querySelector('.content')
const colseBtn = document.getElementById('close')




/* variables */
let oddsWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let turn = true
let winner = false
let Userclick = [];
let tries = 0
let player1 = {
    symbol: ` <i class="fa fa-close"></i>`,
    played: [],
    score: 0,

}
let player2 = {
    symbol: `<i class="fa fa-circle-o"></i>`,
    played: [],
    score: 0,

}





checkturn()
for (let i = 0; i < 9; i++) {
    cells[i].addEventListener('click', () => {
        if (isEmpty(i)) {
            if (turn) {
                symbol(player1, i);
                CheckWin(player1)
                turn = false;
                checkturn()

            }
            else {
                symbol(player2, i)
                CheckWin(player2)
                turn = true;
                checkturn()

            }

        }
        else {
            alert("cliquer dans la colonne vide")
        }


    })
}







function checkturn() {
    if (turn == true) {
        Turn.innerHTML = player1.symbol + " turn"

    }
    else {
        Turn.innerHTML = player2.symbol + " turn"

    }
}

function isEmpty(i) {
    if (Userclick.includes(i)) {
        return false
    }
    else {
        return true
    }
}

function symbol(player, i) {
    if (turn) {
        cells[i].innerHTML = player1.symbol
    }
    else {
        cells[i].innerHTML = player2.symbol
    }

    player.played.push(i);
    Userclick.push(i);

}


function CheckWin(player) {
    if (!winner) {
        oddsWin.some(odd => {
            if (odd.every(index => player.played.includes(index))) {
                MessageOverlay.style.display = 'flex'
                Messagecontent.innerHTML = player.symbol + ' is the <h1>winner</h1>'
                player.score++
                showScore();
                reset()


            }

        })
    }
    if (!winner && Userclick.length == 9) {
        tries++
        showScore();

        MessageOverlay.style.display = 'flex'
        Messagecontent.innerHTML = ' you are  <h1>Equal ! </h1>'
        reset()

    }

}



ResetBtn.addEventListener('click', reset)

function reset() {
    cells.forEach(cell => {
        cell.innerHTML = ''
    })
    Userclick = []
    player1.played = []
    player2.played = []
}




function showScore() {
    Player1score.innerHTML = player1.score
    Player2score.innerHTML = player2.score
    draws.innerHTML = tries;
}

colseBtn.addEventListener('click', () => {
    MessageOverlay.style.display = 'none'
})






















































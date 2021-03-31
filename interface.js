import { newField, newLengthOfAllships } from './seabattle.js';

function createField(place, rows, columns) {
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < columns; j++) {
            let td = document.createElement('td');

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    table.setAttribute('border', '1');
    table.setAttribute('align', 'center')
    place.appendChild(table)
}

const START = document.getElementsByTagName('button')[0];
START.onclick = function () {
    createField(document.body, 10, 10);

    getCoordinates();

    START.parentNode.removeChild(START);
}




function win() {
    let table = document.getElementsByTagName('table')[0];
    table.parentNode.removeChild(table);


    const GAMEWON = document.createElement('h2');
    GAMEWON.textContent = 'You won!';
    document.body.appendChild(GAMEWON);
    showResults();
    newGame();
}

const GAME = {
    FIELD_VALUE: {
        EMPTY: 0,
        SHIP: 1,
        DESTROYED: 2
    },
    FIELD: newField,

    LENGTHOFALLSHIPS: newLengthOfAllships,
}

const PLAYERRESULTS = {
    hits: 0,
    misses: 0,
    overallclicks: 0,
}

function checkCoordinates(y, x) {
    PLAYERRESULTS.overallclicks++;
    if (GAME.FIELD[y][x] == 1) {

        PLAYERRESULTS.hits++;

        GAME.FIELD[y][x] = GAME.DESTROYED;

        tableRowCoordinates[y].getElementsByTagName('td')[x].classList.add('green');
    }

    else {
        tableRowCoordinates[y].getElementsByTagName('td')[x].classList.add('red');
        PLAYERRESULTS.misses++;
    }

    if (PLAYERRESULTS.hits == GAME.LENGTHOFALLSHIPS) {
        setTimeout(win, 1);
    }


}

const tableRowCoordinates = document.getElementsByTagName('tr');

function getCoordinates() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            tableRowCoordinates[i].getElementsByTagName('td')[j].onclick = function (event) {
                checkCoordinates(i, j);
            }
        }
    }
}

function newGame() {
    const NEWGAME = document.createElement('button');
    const TEXT = document.createElement('span');

    TEXT.textContent = 'New Game';

    NEWGAME.classList.add('pushable');
    TEXT.classList.add('front');

    NEWGAME.appendChild(TEXT);

    NEWGAME.onclick = function () {
        window.location.reload();
    };
    document.body.appendChild(NEWGAME);

}

function showResults() {
    const RESULTS = document.createElement('h2');
    RESULTS.textContent = 'RESULTS'

    const HITS = document.createElement('p');
    HITS.textContent = 'Hits: ' + PLAYERRESULTS.hits;

    const MISSES = document.createElement('p');
    MISSES.textContent = "Misses: " + PLAYERRESULTS.misses;

    const OVERALLCLICKS = document.createElement('p');
    OVERALLCLICKS.textContent = "Overall clicks: " + PLAYERRESULTS.overallclicks;

    document.body.appendChild(RESULTS);
    document.body.appendChild(HITS);
    document.body.appendChild(MISSES);
    document.body.appendChild(OVERALLCLICKS);
}

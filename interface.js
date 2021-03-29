import {newField, newLengthOfAllships} from './seabattle.js';

const field = newField;
const lengthOfAllships = newLengthOfAllships;  
const coordinates = document.getElementsByTagName('tr');
let hits = 0;

function win(value) {
    let answer = false;
    if (value == lengthOfAllships) {
        alert('Win!');
        answer = confirm('Wanna play again?');
    }

    if (answer == true) {
        window.location.reload();
    }
}

function checkCoordinates(y, x) {
    if (field[y][x] == 1) {

        hits++;

        field[y][x] = 0;

        coordinates[y + 1].getElementsByTagName('td')[x].classList.add('green');
    }

    else {
        coordinates[y + 1].getElementsByTagName('td')[x].classList.add('red');
    }

    setTimeout(win, 1, hits);
}

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        coordinates[i + 1].getElementsByTagName('td')[j].addEventListener('click', () => {
            checkCoordinates(i, j);
        })
    }
}
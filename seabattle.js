// *Версия на 4 корабля*

// Получает длину корабля от 2 до 4
function getShipsLength() {
    var lengthOfShip = Math.floor(Math.random() * 5);
    if (lengthOfShip == 1) {
        lengthOfShip++
    }
    else if (lengthOfShip == 0) {
        lengthOfShip += 4;
    }
    return lengthOfShip;
};

// Получает направление корабля - по оси Y или по оси X
function getShipsDirection() {
    var direction = Math.floor(Math.random() * 2);
    if (direction == 0)
    {
        return 'Y';
    }
    else
    {
        return 'X';
    }
};

// Получает координаты корабля с направлением по оси Y в зависимости от произвольной длины корабля
function getShipsCoordinatesY(shipsLength) {
    var y;
    var X;

    var shipY = [];
    var shipX = [];

    switch (shipsLength) {
        case 2:
            y = Math.floor(Math.random() * 5);
            x = Math.floor(Math.random() * 5);

            shipY = [y, y + 1];
            shipX = [x];
            break;

        case 3:
            y = Math.floor(Math.random() * 4);
            x = Math.floor(Math.random() * 4);

            shipY = [y, y + 1, y + 2];
            shipX = [x];
            break;

        case 4:
            y = Math.floor(Math.random() * 3);
            x = Math.floor(Math.random() * 3);

            shipY = [y, y + 1, y + 2, y + 3];
            shipX = [x];
            break;
    }
    var ship = {
        shipY,
        shipX,
    };
    return ship;
}

// Получает координаты корабля с направлением по оси X в зависимости от произвольной длины корабля
function getShipsCoordinatesX(shipsLength) {
    var y;
    var X;

    var shipY = [];
    var shipX = [];

    switch (shipsLength) {
        case 2:
            y = Math.floor(Math.random() * 5);
            x = Math.floor(Math.random() * 5);

            shipY = [y];
            shipX = [x, x + 1];
            break;

        case 3:
            y = Math.floor(Math.random() * 4);
            x = Math.floor(Math.random() * 4);

            shipY = [y];
            shipX = [x, x + 1, x + 2];
            break;

        case 4:
            y = Math.floor(Math.random() * 3);
            x = Math.floor(Math.random() * 3);

            shipY = [y];
            shipX = [x, x + 1, x + 2, x + 3];
            break;
    }
    var newShip = {
        shipY,
        shipX,
    };
    return newShip;
}

var field = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var allShips = [];
var lengthOfAllships = 0;

for (var i = 0; i < 4; i++) {
    console.log('Корабль №' + (i + 1));
    var ship;

    var length = getShipsLength();
    console.log('Длина = ' + length);

    lengthOfAllships += length; //Общая длина кораблей, чтобы знать, сколько всего попаданий нужно

    var direction = getShipsDirection();
    console.log('Корабль направлен по оси ' + direction);

    if (direction == 0) {
        ship = getShipsCoordinatesY(length);
        console.log(ship);
        allShips.push(ship);

        //Сдвигаем координаты корабля в зависимости от его номера.
        switch (i) 
        {
            case 1:
                allShips[i].shipX[0] += 5;
                break;

            case 2:

                for (var j = 0; j < allShips[i].shipY.length; j++) 
                {
                    allShips[i].shipY[j] += 4;
                }

                break;

            case 3:

                allShips[i].shipX[0] += 5;

                for (var j = 0; j < allShips[i].shipY.length; j++) 
                {
                    allShips[i].shipY[j] += 4;
                }

                break;
        }
    }

    else 
    {
        ship = getShipsCoordinatesX(length);
        console.log(ship);
        allShips.push(ship);

        switch (i) 
        {
            case 1:

                for (var j = 0; j < allShips[i].shipX.length; j++) 
                {
                    allShips[i].shipX[j] += 5;
                }

                break;

            case 2:

                allShips[i].shipY[0] += 5;

                break;

            case 3:

                allShips[i].shipY[0] += 5;
                
                for (var j = 0; j < allShips[i].shipX.length; j++) 
                {
                    allShips[i].shipX[j] += 5;
                }

                break;
        }

    };
}

//располагаем корабли на поле (1 - наличие корабля)
for (let i = 0; i < 4; i++)
{
    if (allShips[i].shipY.length > allShips[i].shipX.length)
    {
        for (let j = 0; j < allShips[i].shipY.length; j++)
        {
            field[allShips[i].shipY[j]][allShips[i].shipX] = 1;
        };
    }

    else
    {
        for (let j = 0; j < allShips[i].shipX.length; j++)
        {
            field[allShips[i].shipY][allShips[i].shipX[j]] = 1;
        };
    };
}

console.log('Расположение кораблей на поле: ');
console.log(field);

var guessY = 0;
var guessX = 0;
var hits = 0;

while (hits < lengthOfAllships) {

    guessY = prompt('Выберите координату Y от 0 до 10.');
    guessX = prompt('Выберите координату X от 0 до 10.');

    if (guessY > 10 || guessY < 0 || guessX > 10 || guessX < 0 || !guessY || !guessX) 
    {
        alert('Введены неверные координаты.');
    }

    else {

        if (field[guessY][guessX] == 1) 
        {
            alert('Есть пробитие!');
            hits++;
            field[guessY][guessX] = 0;
        }

        else 
        {
            alert('Промах.');
        }
    }
}

alert('Победа!');

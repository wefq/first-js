// *Версия на 4 корабля*

// Получает длину корабля от 2 до 4
function getShipsLength() 
{
    let lengthOfShip = Math.floor((Math.random() * 3) + 2);
    return lengthOfShip;
};

// Получает направление корабля - по оси Y или по оси X
function getShipsDirection() 
{
      return Math.floor(Math.random()*2) ? 'X' : 'Y';
};

// Получает координаты корабля с направлением по оси Y в зависимости от произвольной длины корабля
function getShipsCoordinatesY(shipsLength) 
{
    let y;
    let x;

    let shipY = [];
    let shipX = [];

    switch (shipsLength) 
    {
        case 2:
            y = Math.floor(Math.random() * 4);
            x = Math.floor(Math.random() * 4);

            shipY = [y, y + 1];
            shipX = [x];
            break;

        case 3:
            y = Math.floor(Math.random() * 3);
            x = Math.floor(Math.random() * 3);

            shipY = [y, y + 1, y + 2];
            shipX = [x];
            break;

        case 4:
            y = Math.floor(Math.random() * 2);
            x = Math.floor(Math.random() * 2);

            shipY = [y, y + 1, y + 2, y + 3];
            shipX = [x];
            break;
    }
    let ship = 
    {
        shipY,
        shipX,
    };
    return ship;
}

// Получает координаты корабля с направлением по оси X в зависимости от произвольной длины корабля
function getShipsCoordinatesX(shipsLength) 
{
    let y;
    let x;

    let shipY = [];
    let shipX = [];

    switch (shipsLength) 
    {
        case 2:
            y = Math.floor(Math.random() * 4);
            x = Math.floor(Math.random() * 4);

            shipY = [y];
            shipX = [x, x + 1];
            break;

        case 3:
            y = Math.floor(Math.random() * 3);
            x = Math.floor(Math.random() * 3);

            shipY = [y];
            shipX = [x, x + 1, x + 2];
            break;

        case 4:
            y = Math.floor(Math.random() * 2);
            x = Math.floor(Math.random() * 2);

            shipY = [y];
            shipX = [x, x + 1, x + 2, x + 3];
            break;
    }
    let newShip = 
    {
        shipY,
        shipX,
    };
    return newShip;
}

function getCoordinates(direction, length){
    let coordinates;
    if (direction == 'Y'){
        coordinates = getShipsCoordinatesY(length);
    }
    else {
        coordinates = getShipsCoordinatesX(length);
    }
    return coordinates;
}

let field = new Array(10).fill(0).map(() => new Array(10).fill(0));

class Ship {
    constructor() {
            this.length = getShipsLength(),
            this.direction = getShipsDirection(),
            this.coordinates = getCoordinates(this.direction, this.length);
    }
}

let allShips = [];
let lengthOfAllships = 0;

for (let i = 0; i < 4; i++) 
{
    console.log('Корабль №' + (i + 1));
    let ship = new Ship();

    allShips.push(ship);

    lengthOfAllships += ship.length; //Общая длина кораблей, чтобы знать, сколько всего попаданий нужно

    if (allShips[i].direction == 'Y') 
    {
        //Сдвигаем координаты корабля в зависимости от его номера.
        switch (i) 
        {
            case 1:
                allShips[i].coordinates.shipX[0] += 4;
                break;

            case 2:

                for (let j = 0; j < allShips[i].coordinates.shipY.length; j++) 
                {
                    allShips[i].coordinates.shipY[j] += 4;
                }

                break;

            case 3:

                allShips[i].coordinates.shipX[0] += 4;

                for (let j = 0; j < allShips[i].coordinates.shipY.length; j++) 
                {
                    allShips[i].coordinates.shipY[j] += 4;
                }

                break;
        }
    }

    else 
    {
        switch (i) 
        {
            case 1:

                for (let j = 0; j < allShips[i].coordinates.shipX.length; j++) 
                {
                    allShips[i].coordinates.shipX[j] += 4;
                }

                break;

            case 2:

                allShips[i].coordinates.shipY[0] += 4;

                break;

            case 3:

                allShips[i].coordinates.shipY[0] += 4;
                
                for (var j = 0; j < allShips[i].coordinates.shipX.length; j++) 
                {
                    allShips[i].coordinates.shipX[j] += 4;
                }

                break;
        }

    };
}

//располагаем корабли на поле (1 - наличие корабля)
for (let i = 0; i < 4; i++)
{
    if (allShips[i].coordinates.shipY.length > allShips[i].coordinates.shipX.length)
    {
        for (let j = 0; j < allShips[i].coordinates.shipY.length; j++)
        {
            field[allShips[i].coordinates.shipY[j]][allShips[i].coordinates.shipX] = 1;
        };
    }

    else
    {
        for (let j = 0; j < allShips[i].coordinates.shipX.length; j++)
        {
            field[allShips[i].coordinates.shipY][allShips[i].coordinates.shipX[j]] = 1;
        };
    };
}

console.log('Расположение кораблей на поле: ');
console.log(field);


export {field as newField, lengthOfAllships as newLengthOfAllships}
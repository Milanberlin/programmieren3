class LivingCreature {
    constructor(x, y, colorValue, symbol) {
        this.x = x;
        this.y = y;
        this.colorValue = colorValue;
        this.symbol = symbol;
        this.eaten = 0;
        this.notEaten = 0;
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    updateNeighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseFields(symbol) {
        this.updateNeighbors();
        let found = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i];
            let posX = pos[0];
            let posY = pos[1];
            if (
                posX >= 0 &&
                posX < matrix[0].length &&
                posY >= 0 &&
                posY < matrix.length
            ) {
                if (matrix[posY][posX] === symbol) {
                    found.push(pos);
                }
            }
        }
        return found;
    }

    eat() {

    }

    move() {
    }

    die() {

    }

    mul() {

    }
}

class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y, 1, 1);
        this.rounds = 0;
    }

    mul() {
        this.rounds++;
        if (this.rounds > 6) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let randField = random(emptyFields);
                let newX = randField[0];
                let newY = randField[1];
                let grasObj = new Grass(newX, newY);
                grasArr.push(grasObj);
                matrix[newY][newX] = 1;
            }
            this.rounds = 0;
        }
    }
}

class Grazer extends LivingCreature {
    constructor(x, y) {
        super(x, y, 2, 2);
        this.eaten = 0;
        this.notEaten = 0;
    }

    eat() {
        let grasFields = this.chooseFields(1);
        if (grasFields.length > 0) {
            let randPos = random(grasFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];
            matrix[newY][newX] = this.colorValue;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            grasArr = grasArr.filter(grasObj => !(grasObj.x === this.x && grasObj.y === this.y));
            this.eaten++;
            this.notEaten = 0;
        } else {
            this.notEaten++;
            if (this.notEaten >= 5) {
                this.die();
            } else {
                this.move();
            }
        }
    }

    move() {
        let emptyFields = this.chooseFields(0);
        if (emptyFields.length > 0) {
            let newPos = random(emptyFields);
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorValue;
            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < grazerArr.length; i++) {
            let grazerObj = grazerArr[i];
            if (grazerObj.x === this.x && grazerObj.y === this.y) {
                grazerArr.splice(i, 1);
                break; // Beende die Schleife, sobald das Objekt gefunden und entfernt wurde
            }
        }
    }

    mul() {
        if (this.eaten >= 5) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let newPos = random(emptyFields);
                let newX = newPos[0];
                let newY = newPos[1];
                grazerArr.push(new Grazer(newX, newY));
                matrix[newY][newX] = 2;
            }
            this.eaten = 0;
        }
    }

}
class Fleischfresser extends LivingCreature {
    constructor(x, y) {
        super(x, y, 3, 3);
        this.eaten = 0;
        this.notEaten = 0;
    }

    eat() {
        let grazerFields = this.chooseFields(2);
        if (grazerFields.length > 0) {
            let randPos = random(grazerFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = this.colorValue;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x === this.x && grazerObj.y === this.y) {
                    grazerArr.splice(i, 1);
                    break;
                }
            }

            this.eaten++;
            this.notEaten = 0;
        } else {
            this.notEaten++;
            this.eaten = 0;
            if (this.notEaten >= 8) {
                this.die();
            } else {
                this.move();
            }
        }
    }

    move() {
        let emptyFields = this.chooseFields(0);
        if (emptyFields.length > 0) {
            let newPos = random(emptyFields);
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorValue;
            this.x = newX;
            this.y = newY;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < fleischfresserArr.length; i++) {
            let fleischfresserObj = fleischfresserArr[i];
            if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                fleischfresserArr.splice(i, 1);
                break;
            }
        }
    }
    mul() {
        if (this.eaten >= 8) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let newPos = random(emptyFields);
                let newX = newPos[0];
                let newY = newPos[1];
                fleischfresserArr.push(new Fleischfresser(newX, newY));
                matrix[newY][newX] = 3;
            }
            this.eaten = 0;
        }
    }

}


class Snake extends LivingCreature {
    constructor(x, y) {
        super(x, y, 4, 4);
        this.eaten = 0;
        this.notEaten = 0;
    }

    eat() {
        let fleischfresserFields = this.chooseFields(2);
        if (fleischfresserFields.length > 0) {
            let randPos = random(fleischfresserFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = this.colorValue;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            for (let i = 0; i < fleischfresserArr.length; i++) {
                let fleischfresserObj = fleischfresserArr[i];
                if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                    fleischfresserArr.splice(i, 1);
                    break;
                }
            }

            this.eaten++;
            this.notEaten = 0;
        } else {
            this.notEaten++;
            this.eaten = 0;
            if (this.notEaten >= 18) {
                this.die();
            } else {
                this.move();
            }
        }
    }

    move() {
        let emptyFields = this.chooseFields(0);
        if (emptyFields.length > 0) {
            let newPos = random(emptyFields);
            let newX = newPos[0];
            let newY = newPos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorValue;
            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < snakeArr.length; i++) {
            let snakeObj = snakeArr[i];
            if (snakeObj.x === this.x && snakeObj.y === this.y) {
                snakeArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        if (this.eaten >= 18) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let newPos = random(emptyFields);
                let newX = newPos[0];
                let newY = newPos[1];
                snakeArr.push(new Snake(newX, newY));
                matrix[newY][newX] = 4;
            }
            this.eaten = 0;
        }
    }
}

class Lion extends LivingCreature {
    constructor(x, y) {
        super(x, y, 5, 5);
        this.eaten = 0;
        this.notEaten = 0;
    }

    eat() {
        let snakeFields = this.chooseFields(4);
        if (snakeFields.length > 0) {
            let randPos = random(snakeFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];

            matrix[newY][newX] = this.colorValue;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < snakeArr.length; i++) {
                let snakeObj = snakeArr[i];
                if (snakeObj.x === this.x && snakeObj.y === this.y) {
                    snakeArr.splice(i, 1);
                    break;
                }
            }

            this.eaten++;
            this.notEaten = 0;
        } else {
            this.notEaten++;
            this.eaten = 0;
            if (this.notEaten >= 19) {
                this.die();
            } else {
                this.move();
            }
        }
    }

    move() {
        let emptyFields = this.chooseFields(0);
        if (emptyFields.length > 0) {
            let newPos = random(emptyFields);
            let newX = newPos[0];
            let newY = newPos[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorValue;

            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < lionArr.length; i++) {
            let lionObj = lionArr[i];
            if (lionObj.x === this.x && lionObj.y === this.y) {
                lionArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        if (this.eaten >= 19) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let newPos = random(emptyFields);
                let newX = newPos[0];
                let newY = newPos[1];
                lionArr.push(new Lion(newX, newY));
                matrix[newY][newX] = 5;
            }
            this.eaten = 0;
        }
    }
}

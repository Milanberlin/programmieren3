const LivingCreature = require("./livingCreature.js");
let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 2, 1, 2, 2],
    [1, 1, 0, 2, 2],
    [1, 1, 5, 2, 3],
    [1, 1, 4, 2, 2]
];
module.exports = class Snaske extends LivingCreature {
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

const LivingCreature = require("./livingCreature.js");
const { state, random } = require("../global.js");
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

            state.matrix[newY][newX] = this.colorValue;
            state.matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            for (let i = 0; i < state.fleischfresserArr.length; i++) {
                let fleischfresserObj = state.fleischfresserArr[i];
                if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                    state.fleischfresserArr.splice(i, 1);
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
            state.matrix[this.y][this.x] = 0;
            state.matrix[newY][newX] = this.colorValue;
            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        state.matrix[this.y][this.x] = 0;
        for (let i = 0; i < state.snakeArr.length; i++) {
            let snakeObj = state.snakeArr[i];
            if (snakeObj.x === this.x && snakeObj.y === this.y) {
                state.snakeArr.splice(i, 1);
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
                state.snakeArr.push(new Snake(newX, newY));
                state.matrix[newY][newX] = 4;
            }
            this.eaten = 0;
        }
    }
}

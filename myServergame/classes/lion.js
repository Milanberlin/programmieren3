const LivingCreature = require("./livingCreature.js");


module.exports = class Lion extends LivingCreature {
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

            state.matrix[newY][newX] = this.colorValue;
            state.matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (let i = 0; i < snakeArr.length; i++) {
                let snakeObj = state.snakeArr[i];
                if (snakeObj.x === this.x && snakeObj.y === this.y) {
                    state.snakeArr.splice(i, 1);
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

            state.matrix[this.y][this.x] = 0;
            state.matrix[newY][newX] = this.colorValue;

            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        state.matrix[this.y][this.x] = 0;
        for (let i = 0; i < state.lionArr.length; i++) {
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
                state.lionArr.push(new Lion(newX, newY));
                state.matrix[newY][newX] = 5;
            }
            this.eaten = 0;
        }
    }
}

const LivingCreature = require("./livingCreature.js");
const { state, random } = require("../global.js");
module.exports = class Fleischfresser extends LivingCreature {
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

            state.matrix[newY][newX] = this.colorValue;
            state.matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            for (let i = 0; i < state.grazerArr.length; i++) {
                let grazerObj = state.grazerArr[i];
                if (grazerObj.x === this.x && grazerObj.y === this.y) {
                    state.grazerArr.splice(i, 1);
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
            state.matrix[this.y][this.x] = 0;
            state.matrix[newY][newX] = this.colorValue;
            this.x = newX;
            this.y = newY;
        }
    }
    die() {
        state.matrix[this.y][this.x] = 0;
        for (let i = 0; i < state.fleischfresserArr.length; i++) {
            let fleischfresserObj = state.fleischfresserArr[i];
            if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                state.fleischfresserArr.splice(i, 1);
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
                state.matrix[newY][newX] = 3;
            }
            this.eaten = 0;
        }
    }

}
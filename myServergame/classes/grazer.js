const LivingCreature = require("./livingCreature.js");
module.exports = class Grazer extends LivingCreature {
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
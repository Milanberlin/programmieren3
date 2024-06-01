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
module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.colorValue = 1;
        this.roundCount = 0;
    }
    mul() {
        // counter > 6 , dann vermehren
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
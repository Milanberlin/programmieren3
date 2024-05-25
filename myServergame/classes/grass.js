const LivingCreature = require("./livingCreature.js");
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
const LivingCreature = require("./livingCreature.js");
const { state, random } = require("../global.js");
module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.colorValue = 1;
        this.roundCount = 0;
    }
    mul() {
        // counter > 6 , dann vermehren
        this.roundCount++;
        if (this.roundCount > 6) {
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let randField = random(emptyFields);
                let newX = randField[0];
                let newY = randField[1];
                let grasObj = new Grass(newX, newY);
                state.grasArr.push(grasObj);
                state.matrix[newY][newX] = 1;
            }
            this.roundCount = 0;
        }
    }
}                                                
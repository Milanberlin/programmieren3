const LivingCreature = require("./livingCreature.js");
const { state, random } = require("../global.js");
module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.colorValue = 1;
        this.roundCount = 0;
    }
    mul() {
        this.roundCount++;
        let mulThreshold = 6;
    
        if (state.weather === "summer") {
            mulThreshold = 4;
        } else if (state.weather === "winter") {
            mulThreshold = 8;
        }
    
        if (this.roundCount > mulThreshold) {
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
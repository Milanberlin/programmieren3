const { state } = require('../global.js');

module.exports = class LivingCreature {
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
                posX < state.matrix[0].length &&
                posY >= 0 &&
                posY < state.matrix.length
            ) {
                if (state.matrix[posY][posX] === symbol) {
                    found.push(pos);
                }
            }
        }
        return found;
    }
 }
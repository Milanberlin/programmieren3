let matrix = [
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 2, 1, 2, 2],
    [1, 1, 0, 2, 2],
    [1, 1, 5, 2, 3],
    [1, 1, 4, 2, 2]
];

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
                posX < matrix[0].length &&
                posY >= 0 &&
                posY < matrix.length
            ) {
                if (matrix[posY][posX] === symbol) {
                    found.push(pos);
                }
            }
        }
        return found;
    }
 }
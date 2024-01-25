class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this, y - 1],
            [this.x, +1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this, x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }
}
chooseCell(ch); {
    let found = [];
    for (let i in this.directions) {
        let x = this.directions[i][0];
        let y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == ch) {
                found.push(this.directions[i]);
            }
        }
    }
    return found;
 }
class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        let newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            let newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell][1][newCell][0] = this.index;
            this, multiply = 0;

        }
    }
}

class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colorValue = 1;
        this.rounds = 0; // RundenzÃ¤hler
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]; // Nachbarfelder
    }

    // Verhalten Methode
    chooseFields(symbol) {
        let found = [];
        // finde leere Nachbarfelder
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i]; // (x, y)
            let posX = pos[0];
            let posY = pos[1];
            // checke Spielfeldgrenzen
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] === symbol) {
                    // Das Nachbarfeld ist in Matrix ein leeres Feld
                    found.push(pos);
                }
            }
        }
        return found;
    }


    // vermehren
    mul() {
        // rundenzÃ¤hler erhÃ¶hen
        this.rounds++;
        // rundenzÃ¤hler checken
        if (this.rounds > 6) {
            // vermehren
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                let randField = random(emptyFields);
                let newX = randField[0];
                let newY = randField[1]
                // neues Grasobjekt erstellen
                let grasObj = new Grass(newX, newY)
                // Grasobjekt der Lebewesenlisten hinzufÃ¼gen
                grasArr.push(grasObj);
                // Matrix uptade
                matrix[newY][newX] = 1;
            }
            this.rounds = 0;
        }
    }
}
class Grazer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colorValue = 2;
        this.eaten = 0; // RundenzÃ¤hler, wenn gefressen
        this.notEaten = 0;// RundenzÃ¤hler wenn nichts gefressen
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]; // Nachbarfelder
    }




    updateneighbor() {
        [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
    }

    chooseFields(symbol) {
        this.updateneighbor();
        let found = [];
        // finde leere Nachbarfelder
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i]; // (x, y)
            let posX = pos[0];
            let posY = pos[1];
            // checke Spielfeldgrenzen
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] === symbol) {
                    // Das Nachbarfeld ist in Matrix ein leeres Feld
                    found.push(pos);
                }
            }
        }
        return found;
    }


    eat() {
        let grasFields = this.chooseFields(1);
        if (grasFields.length > 0) {
            // essen
            let randPos = random(grasFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];

            // matrix aktuelisieren
            // new Pos -2
            matrix[newY][newX] = this.colorValue
            // alte Pos -0
            matrix[this.y][this.x] = 0
            // eigene Position uptaten
            this.x = newX;
            this.y = newY;
            // grasobjekt lÃ¶schen aus grassArr
            for (let i = 0; i < grasArr.length; i++) {
                let grasObj = grasArr[i];
                if (grasObj.x === this.x && grasObj.y === this.y) {
                    // Grasobjekt lÃ¶schen
                    grasArr.splice(i, 1);
                }
            }

            this.eaten++;
            this.noteaten = 0;
        } else {
            this.notEaten++;
            this.eaten = 0;
            if (this.notEaten >= 5) {
                this.die();
            } else {
                this.move();
            }


        }
    }


    move() {
        let emptyFields = this.chooseFields(0);
        let newX;
        let newY;
        if (emptyFields.length > 0) {
            // wÃ¤hle aus Liste emptyFields zufÃ¤llig ein Element aus
            let newPos = random(emptyFields); // [x,y]
            newX = newPos[0];
            newY = newPos[1];
            // Matrix aktuelisieren
            // alte pos von Grassfresser
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.colorValue

            this.x = newX;
            this.y = newY;
        }

        // Ã¤ndere x und y v. Grassfresserobjektes



    }
    die() {
        // Matrix aktueliesieren auf aktuelle Pos - 0
        matrix[this.y][this.x] = 0;
        // aus grasfresser Liste lÃ¶schen
        for (let i = 0; i < grazerArr.length; i++) {
            let grazerObj = grazerArr[i]; {
                let grazerObj = grazerArr[i];
                if (grazerObj.x === this.x && grazerObj.y === this.y)
                    grazerArr.splice(i, 1);
            }

        }

    }
    mul() {
        if (this.eaten >= 5) {
            // finde leere Nachbarfelder
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                // wÃ¤hle zufÃ¤llig eines aus
                let newPos = random(emptyFields) // [x,y]
                // hole x und y
                let newX = newPos[0];
                let newY = newPos[1];
                // neuen Grasfresser spawnen
                let grazerObj = new Grazer(newX, newY);
                grazerArr.push(grazerObj);
                // Spielfeld / Matrix aktuelisieren
                matrix[newY][newX] = 2;

            }
            this.eaten = 0;
        }

    }
} // Ende klasse Grazer
class Fleischfresser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colorValue = 3;
        this.eaten = 0; // RundenzÃ¤hler, wenn gefressen
        this.notEaten = 0;// RundenzÃ¤hler wenn nichts gefressen
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]; // Nachbarfelder
    }

    updateneighbor() {
        [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
    }

    chooseFields(symbol) {
        this.updateneighbor();
        let found = [];
        // finde leere Nachbarfelder
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i]; // (x, y)
            let posX = pos[0];
            let posY = pos[1];
            // checke Spielfeldgrenzen
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] === symbol) {
                    // Das Nachbarfeld ist in Matrix ein leeres Feld
                    found.push(pos);
                }
            }
        }
        return found;
    }


    eat() {
        let grazerFields = this.chooseFields(2);
        if (grazerFields.length > 0) {
            // essen
            let randPos = random(grazerFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];

            // matrix aktuelisieren
            // new Pos -2
            matrix[newY][newX] = this.colorValue
            // alte Pos -0
            matrix[this.y][this.x] = 0
            // eigene Position uptaten
            this.x = newX;
            this.y = newY;
            // grasobjekt lÃ¶schen aus grassArr
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x === this.x && grazerObj.y === this.y) {
                    // Grasobjekt lÃ¶schen
                    grazerArr.splice(i, 1);
                }
            }

            this.eaten++;
            this.noteaten = 0;
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
        let newX;
        let newY;
        if (emptyFields.length > 0) {
            // wÃ¤hle aus Liste emptyFields zufÃ¤llig ein Element aus
            let newPos = random(emptyFields); // [x,y]
            newX = newPos[0];
            newY = newPos[1];
            // Matrix aktuelisieren
            // alte pos von Grassfresser
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.colorValue

            this.x = newX;
            this.y = newY;
        }

        // Ã¤ndere x und y v. Grassfresserobjektes



    }
    die() {
        // Matrix aktueliesieren auf aktuelle Pos - 0
        matrix[this.y][this.x] = 0;
        // aus grasfresser Liste lÃ¶schen
        for (let i = 0; i < fleischfresserArr.length; i++) {
            let fleischfresserObj = fleischfresserArr[i]; {
                let fleischfresserObj = fleischfresserArr[i];
                if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y)
                    fleischfresserArr.splice(i, 1);
            }

        }

    }
    mul() {
        if (this.eaten >= 8) {
            // finde leere Nachbarfelder
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                // wÃ¤hle zufÃ¤llig eines aus
                let newPos = random(emptyFields) // [x,y]
                // hole x und y
                let newX = newPos[0];
                let newY = newPos[1];
                // neuen Grasfresser spawnen
                let fleischfresserObj = new Fleischfresser(newX, newY);
                fleischfresserArr.push(fleischfresserObj);
                // Spielfeld / Matrix aktuelisieren
                matrix[newY][newX] = 3;

            }
            this.eaten = 0;
        }



    }

}

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colorValue = 4;
        this.eaten = 0; // RundenzÃ¤hler, wenn gefressen
        this.notEaten = 0;// RundenzÃ¤hler wenn nichts gefressen
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]; // Nachbarfelder
    }
    updateneighbor() {
        [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
    }

    chooseFields(symbol) {
        this.updateneighbor();
        let found = [];
        // finde leere Nachbarfelder
        for (let i = 0; i < this.neighbors.length; i++) {
            let pos = this.neighbors[i]; // (x, y)
            let posX = pos[0];
            let posY = pos[1];
            // checke Spielfeldgrenzen
            if (posX >= 0 && posX < matrix[0].length && posY >= 0 && posY < matrix.length) {
                if (matrix[posY][posX] === symbol) {
                    // Das Nachbarfeld ist in Matrix ein leeres Feld
                    found.push(pos);
                }
            }
        }
        return found;
    }


    eat() {
        let fleischfresserFields = this.chooseFields(2);
        if (fleischfresserFields.length > 0) {
            // essen
            let randPos = random(fleischfresserFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];

            // matrix aktuelisieren
            // new Pos -2
            matrix[newY][newX] = this.colorValue
            // alte Pos -0
            matrix[this.y][this.x] = 0
            // eigene Position uptaten
            this.x = newX;
            this.y = newY;
            // grasobjekt lÃ¶schen aus grassArr
            for (let i = 0; i < fleischfresserArr.length; i++) {
                let fleischfresserObj = fleischfresserArr[i];
                if (fleischfresserObj.x === this.x && fleischfresserObj.y === this.y) {
                    // Grasobjekt lÃ¶schen
                    fleischfresserArr.splice(i, 1);
                }
            }

            this.eaten++;
            this.noteaten = 0;
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
        let newX;
        let newY;
        if (emptyFields.length > 0) {
            // wÃ¤hle aus Liste emptyFields zufÃ¤llig ein Element aus
            let newPos = random(emptyFields); // [x,y]
            newX = newPos[0];
            newY = newPos[1];
            // Matrix aktuelisieren
            // alte pos von Grassfresser
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = this.colorValue

            this.x = newX;
            this.y = newY;
        }

        // Ã¤ndere x und y v. Grassfresserobjektes



    }
    die() {
        // Matrix aktueliesieren auf aktuelle Pos - 0
        matrix[this.y][this.x] = 0;
        // aus grasfresser Liste lÃ¶schen
        for (let i = 0; i < snakeArr.length; i++) {
            let snakeObj = snakeArr[i]; {
                let snakeObj = snakeArr[i];
                if (snakeObj.x === this.x && snakeObj.y === this.y)
                    snakeArr.splice(i, 1);
            }

        }

    }
    mul() {
        if (this.eaten >= 18) {
            // finde leere Nachbarfelder
            let emptyFields = this.chooseFields(0);
            if (emptyFields.length > 0) {
                // wÃ¤hle zufÃ¤llig eines aus
                let newPos = random(emptyFields) // [x,y]
                // hole x und y
                let newX = newPos[0];
                let newY = newPos[1];
                // neuen Grasfresser spawnen
                let snakeObj = new Snake(newX, newY);
                snakeArr.push(snakeObj);
                // Spielfeld / Matrix aktuelisieren
                matrix[newY][newX] = 4;

            }
            this.eaten = 0;
        }



    }

}
class Lion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colorValue = 5;
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
    eat() {
        let snakeFields = this.chooseFields(4);
        if (snakeFields.length > 0) {
            // essen
            let randPos = random(snakeFields); //[x,y]
            let newX = randPos[0];
            let newY = randPos[1];


            matrix[newY][newX] = this.colorValue
            matrix[this.y][this.x] = 0
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < snakeArr.length; i++) {
                let snakeObj = snakeArr[i];
                if (snakeObj.x === this.x && snakeObj.y === this.y) {
                    snakeArr.splice(i, 1);
                }
            }

            this.eaten++;
            this.noteaten = 0;
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

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorValue;

            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < lionArr.length; i++) {
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
                let lionObj = new Lion(newX, newY);
                lionArr.push(lionObj);
                matrix[newY][newX] = 5;
            }
            this.eaten = 0;
        }
    }
}
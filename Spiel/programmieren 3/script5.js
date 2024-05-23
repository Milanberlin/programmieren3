let matrix = [
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 2, 1, 2, 2],
    [1, 1, 0, 2, 2],
    [1, 1, 5, 2, 3],
    [1, 1, 4, 2, 2]
];
let fr = 50;
let side = 10;

let grasArr = [];
let grazerArr = [];
let fleischfresserArr = [];
let snakeArr = [];
let lionArr = [];

function getRandomMatrix(b, h) {
    let matrix = [];
    for (let y = 0; y < h; y++) {
        let arr = [];
        matrix[y] = arr; // leeres Zeilenarray
        for (let x = 0; x < b; x++) {
            // Zeilenarray befüllen
            matrix[y][x] = Math.floor(random(0, 2));
        }
    }
    return matrix;
}
function addMoreCreatures(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (y == x) {
                if (y % 2 == 0) {
                    if (random(100) < 30) { 
                        matrix[y][x] = 3; // Fleischfresser
                    } else {
                        matrix[y][x] = 2; // Grazer
                    }
                } else {
                    if (random(100) < 20) { 
                        matrix[y][x] = 5; // Lion
                    } else {
                        matrix[y][x] = 4; // Snake
                    }
                }
            }
        }
    }
}

function setup() {
    matrix = getRandomMatrix(50, 50);
    addMoreCreatures(matrix);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background("#acacac");
    frameRate(fr);

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            let farbWert = matrix[y][x];
            if (farbWert === 1) {
                let grObj = new Grass(x, y);
                grasArr.push(grObj);
            } else if (farbWert === 2) {
                let grObj = new Grazer(x, y);
                grazerArr.push(grObj);
            } else if (farbWert === 3) {
                let ffObj = new Fleischfresser(x, y);
                fleischfresserArr.push(ffObj);
            } else if (farbWert === 4) {
                let skObj = new Snake(x, y);
                snakeArr.push(skObj);
            } else if (farbWert === 5) {
                let liObj = new Lion(x, y);
                lionArr.push(liObj);
            }
        }
    }
}

function draw() {
    for (let i = 0; i < grasArr.length; i++) {
        let grasObj = grasArr[i];
        grasObj.mul();
    }
    for (let i = 0; i < grazerArr.length; i++) {
        let grazer = grazerArr[i];
        grazer.mul();
        grazer.eat();
    }
    for (let i = 0; i < fleischfresserArr.length; i++) {
        let fleischfresser = fleischfresserArr[i];
        fleischfresser.mul();
        fleischfresser.eat();
    }
    for (let i = 0; i < snakeArr.length; i++) {
        let snake = snakeArr[i];
        snake.mul();
        snake.eat();
    }
    for (let i = 0; i < lionArr.length; i++) {
        let lion = lionArr[i];
        lion.mul();
        lion.eat();
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            let farbWert = matrix[y][x];
            fill("white");
            if (farbWert === 1) {
                fill("green");
            } else if (farbWert === 2) {
                fill("yellow");
            } else if (farbWert === 3) {
                fill("red");
            } else if (farbWert === 4) {
                fill("blue");
            } else if (farbWert === 5) {
                fill("brown");
            }
            rect(x * side, y * side, side, side);
        }
    }
}
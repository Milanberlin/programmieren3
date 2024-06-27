function random(...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
        return Math.random() * args[0];
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        return Math.random() * (args[1] - args[0] + 1) - args[0];
    } else {
        console.log(args);
        throw new Error('Invalid arguments');
    }
}



let grasArr = [];
let grazerArr = [];
let fleischfresserArr = [];
let snakeArr = [];
let lionArr = [];

function getRandMatrix(b, h) {
    let matrix = [];
    for (let y = 0; y < h; y++) {
        let arr = [];
        matrix[y] = arr; // leeres Zeilenarray
        for (let x = 0; x < b; x++) {
            // Zeilenarray befüllen
            matrix[y][x] = Math.floor(random(0, 1));
        }
    }
    return matrix;
}

let matrix = getRandMatrix(50, 50);

let state = {
    matrix: matrix,
    grasArr: grasArr,
    grazerArr: grazerArr,
    fleischfresserArr: fleischfresserArr,
    snakeArr: snakeArr,
    lionArr: lionArr
}


module.exports = {
    state: state,
    random: random
}
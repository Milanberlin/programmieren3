const Grass = require("./classes/grass.js");
const Grazer = require("./classes/grazer.js");
const Fleischfresser = require("./classes/fleischfresser.js");
const Snake = require("./classes/snake.js");
const Lion = require("./classes/lion.js");

let interValID
let gameStarted = false;

const { Console } = require("console");
const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);
app.use(express.static('./clients'));
app.get("/", function (req, res) {
    res.redirect('client.html');
})

let clients = [];
server.listen(3000, function () {
    console.log("Der Server läuft auf port 3000");

    io.on("connection", function (socket) {
        console.log("ws-connection client")

        clients.push(socket)

        if (clients.length == 1 && gameStarted == false) {


            // spiel starten
            initGame();
            console.log(matrix);
            // spielschleife starten

            intervalID = setInterval(function () {
                updategame();
            }, 1000);


        }
        socket.on("disconnect", function (reason) {
            console.log("client ws disconnect reason - ", reason)
            const foundIndex = clients.findIndex(id => id == socket.id);

            if (foundIndex >= 0) {
                client.splice(foundIndex, 1);


            }
            if (clients.length === 0) {
                isGameRunning = false;
                clearInterval(interValID);
                console.log("Spiel gestoppt: keine Clients", clients.length);
            }
        })
    })
    // spiel gestartet
    //initgame();
    // spielschleife starten
    //intervalID = setInterval(function(){
    //updategame();
    //}, 1000);
});


///// Spiellogik
let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 2, 1, 2, 2],
    [1, 1, 0, 2, 2],
    [1, 1, 5, 2, 3],
    [1, 1, 4, 2, 2]
];


let grasArr = [];
let grazerArr = [];
let fleischfresserArr = [];
let snakeArr = [];
let lionArr = [];

function random(...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
        return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        return Math.random() * (args[1] - args[0] + 1) - args[0];
    } else {
        console.log(args);
        throw new Error('Invalid arguments');
    }
}



function getRandMatrix(b, h) {
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

function addMoreCreatures() {
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

function initGame() {
    console.log('init game....');
    matrix = getRandMatrix(50, 50);
    addMoreCreatures();



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
//console.log("Sende matrix zu clients")
//io.sockets.emit('matrix', matrix);


function updategame() {
    console.log("update game...");
    for (let i = 0; i < grasArr.length; i++) {
        let grassObj = grasArr[i];
        grassObj.mul();
    }

    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();

    }
    //console.log(matrix);
    console.log("sende matrix zu clients...");
    io.sockets.emit('matrix', matrix);
}

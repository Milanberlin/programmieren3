const Grass = require("./classes/grass.js");
const Grazer = require("./classes/grazer.js");
const Fleischfresser = require("./classes/fleischfresser.js");
const Snake = require("./classes/snake.js");
const Lion = require("./classes/lion.js");
const { state, random } = require("./global.js");

let interValID
let gameStarted = false;

const { Console } = require("console");
const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);
app.use(express.static('./clients'));
app.get("/", function (req, res) {
    res.redirect('./client.html');
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
             //console.log(state.matrix);
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







function addMoreCreatures() {
    for (let y = 0; y < state.matrix.length; y++) {
        for (let x = 0; x < state.matrix[y].length; x++) {
            if (y == x) {
                if (y % 2 == 0) {
                    if (random(100) < 30) {
                        state.matrix[y][x] = 3; // Fleischfresser
                    } else {
                        state.matrix[y][x] = 2; // Grazer
                    }
                } else {
                    if (random(100) < 20) {
                        state.matrix[y][x] = 5; // Lion
                    } else {
                        state.matrix[y][x] = 4; // Snake
                    }
                }
            }
        }
    }
}

function initGame() {
    console.log('init game....');

    addMoreCreatures();



    for (let y = 0; y < state.matrix.length; y++) {
        for (let x = 0; x < state.matrix[y].length; x++) {
            let farbWert = state.matrix[y][x];
            if (farbWert === 1) {
                let grObj = new Grass(x, y);
                state.grasArr.push(grObj);
            } else if (farbWert === 2) {
                let grObj = new Grazer(x, y);
                state.grazerArr.push(grObj);
            } else if (farbWert === 3) {
                let ffObj = new Fleischfresser(x, y);
                state.fleischfresserArr.push(ffObj);
            } else if (farbWert === 4) {
                let skObj = new Snake(x, y);
                state.snakeArr.push(skObj);
            } else if (farbWert === 5) {
                let liObj = new Lion(x, y);
                state.lionArr.push(liObj);
            }
        }
    }
}
//console.log("Sende matrix zu clients")
//io.sockets.emit('matrix', matrix);


function updategame() {
    console.log("update game...");
    for (let i = 0; i < state.grasArr.length; i++) {
        let grassObj = state.grasArr[i];
        grassObj.mul();
    }

    for (let i = 0; i < state.grazerArr.length; i++) {
        let grazerObj = state.grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();


    }
    for (let i = 0; i < state.fleischfresserArr.length; i++) {
        let ffObj = state.fleischfresserArr[i];
        ffObj.eat();
        ffObj.mul();

    }
    for (let i = 0; i < state.snakeArr.length; i++) {
        let  skObj = state.snakeArr[i];
        skObj.eat();
        skObj.mul();

    }
    for (let i = 0; i < state.lionArr.length; i++) {
        let  liObj = state.lionArr[i];
        liObj.eat();
        liObj.mul();

    }
    //console.log(matrix);
    console.log("sende matrix zu clients...");
    io.sockets.emit('matrix', state.matrix);
}



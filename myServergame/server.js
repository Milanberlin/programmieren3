
let interValID
let gameStarted = false;

const { Console } = require("console");
const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);
app.use(express.static)('./client')
app.get("/", function(req, res) {
    res.redirect('client.html');
})

let clients = [];
server.listen(3000, function () {
    console.log("Der Server läuft auf port 3000");

    io.on("connection", function (socket) {
        console.log("ws-connection client", socket,id)

        clients.push(socket,id)

        if (clients.length == 1 && gameStarted == false) {


            // spiel starten
            initgame();
            console.log(matrix);
    // spielschleife starten
    intervalID = setInterval(function(){
    updategame();
    }, 1000);


        }
        socket.on("disconnect", function(reason) {
            console.log("client ws disconnect reason - ", reeason)
            const foundIndex = clients.findIndex(id => id == socket.id);

            if (foundIndex >= 0) {
                client.splice(foundIndex, 1);
                
                
            }
            if () {
                
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
matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 2, 1, 2, 2],
    [1, 1, 0, 2, 2],
    [1, 1, 5, 2, 3],
    [1, 1, 4, 2, 2]
];

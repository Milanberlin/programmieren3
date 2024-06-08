// Socket.io: Verbindung zum Server herstellen
// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 20;

// setup Funktion von p5.js
function setup() {
    createCanvas(windowWidth, windowHeight);
}

// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
socket.on('matrix', (matrix) => {
    // Die Matrix wird auf den Bildschirm gezeichnet.
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            let farbWert = matrix[i][j];

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

            rect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
});

// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {

// Socket.io: Verbindung zum Server herstellen
// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 20;

let blitzImage;


document.addEventListener("DOMContentLoaded", function() {
    const blitzButton = document.getElementById('blitzButton');
    if (blitzButton) {
        blitzButton.addEventListener('click', () => {
            socket.emit('createBlitz');
            console.log("Blitz erzeugen Button gedrückt");
        });
    } else {
        console.error("Element with ID 'blitzButton' not found.");
    }
});
function setup() {
    createCanvas(windowWidth, windowHeight);
    blitzImage = loadImage("blitz.png")

    };
// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
socket.on('matrix', (matrix) => {
    // Die Matrix wird auf den Bildschirm gezeichnet.
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let farbWert = matrix[i][j];
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

            rect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
});

// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {
    socket.on('blitz', (blitz) => {
        image(blitzImage, blitz.x * cellSize, blitz.y * cellSize, 3*cellSize, 3*cellSize)
    });

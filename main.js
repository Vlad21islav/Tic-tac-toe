import { drawO, drawX, drawRect } from './functions.js';

const canvas = document.getElementById('cnv');
var ctx = canvas.getContext('2d');

var turn = 'X';
var field = [
    '', '', '', 
    '', '', '', 
    '', '', ''
];

function setPixel(event) {
    const x = event.clientX * window.devicePixelRatio;
    const y = event.clientY * window.devicePixelRatio;

    tack(x, y)
}
canvas.addEventListener('mousedown', setPixel);


function tack(mouse_x, mouse_y) {
    var width = window.innerWidth * window.devicePixelRatio;
    var height = window.innerHeight * window.devicePixelRatio;
    canvas.width = width;
    canvas.height = height;
    drawRect(0, 0, width, height, "rgb(29, 32, 37)", 1, "rgb(29, 32, 37)");
    let field_width = width;
    let field_height = height;
    let min = Math.min(width, height);
    let max = Math.max(width, height);
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (width > height) {
                field_width = field_height;
                var data = [y * field_width / 3 + (max - min) / 2, x * field_height / 3, field_width / 3, field_height / 3];
            } else {
                field_height = field_width;
                var data = [y * field_width / 3, x * field_height / 3 + (max - min) / 2, field_width / 3, field_height / 3];
            }
            drawRect(data[0], data[1], data[2], data[3], "rgb(29, 32, 37)", 3, "white");

            if (field[x * 3 + y] == 'X') {
                drawX(data[0], data[1], data[2], data[3]);
            } else if (field[x * 3 + y] == 'O') {
                drawO(data[0], data[1], data[2], data[3]);
            }
            
            if (field[x * 3 + y] == '') {
                if (mouse_x > data[0] && mouse_x < data[0] + data[2] && mouse_y > data[1] && mouse_y < data[1] + data[3]) {
                    field[x * 3 + y] = turn;
                    turn = turn == 'X' ? 'O' : 'X';

                }
            }
        }
    }
}

setInterval(tack, 10);

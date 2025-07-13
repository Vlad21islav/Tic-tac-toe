const canvas = document.getElementById('cnv');
var ctx = canvas.getContext('2d');


export function drawPoligon(angles, color='black', line_width=1, fill_color='') {
    ctx.strokeStyle = color;
    ctx.lineWidth = line_width;
    ctx.beginPath();
    ctx.moveTo(angles[0].x, angles[0].y);
    for (var i = 1; i < angles.length; i++) {
    ctx.lineTo(angles[i].x, angles[i].y);
    }
    ctx.closePath();
    if (fill_color != '') {
        ctx.fillStyle = fill_color;
        ctx.fill();
    }
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
}


export function drawCircle(x, y, radius, color='black', line_width=1, fill_color='') {
    ctx.strokeStyle = color;
    ctx.lineWidth = line_width;
    ctx.beginPath();
    ctx.arc(x, y, radius - line_width / 2, 0, 2 * Math.PI);
    ctx.closePath();
    if (fill_color != '') {
        ctx.fillStyle = fill_color;
        ctx.fill();
    }
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
}


export function drawX(x, y, width, height, color='black', line_width=1, fill_color='black') {
    var vertices = [
        {x: x + 0, y: y + 0},
        {x: x + width / 6 * 1, y: y + 0},
        {x: x + width / 6 * 3, y: y + height / 6 * 2},
        {x: x + width / 6 * 5, y: y + 0},
        {x: x + width, y: y + 0},
        {x: x + width, y: y + height / 6 * 1},
        {x: x + width / 6 * 4, y: y + height / 6 * 3},
        {x: x + width, y: y + height / 6 * 5},
        {x: x + width, y: y + height},
        {x: x + width / 6 * 5, y: y + height},
        {x: x + width / 6 * 3, y: y + height / 6 * 4},
        {x: x + width / 6 * 1, y: y + height},
        {x: x + 0, y: y + height},
        {x: x + 0, y: y + height / 6 * 5},
        {x: x + width / 6 * 2, y: y + height / 6 * 3},
        {x: x + 0, y: y + height / 6}
    ];
    drawPoligon(vertices, color, line_width, fill_color);
}


export function drawO(x, y, width, height, color='black', line_width=1, fill_color='') {
    drawCircle(x + width / 2, y + height / 2, (width + height) / 4, color, width / 10, fill_color);
}


export function drawRect(x, y, width, height, color='black', line_width=1, fill_color='') {
    ctx.strokeStyle = color;
    ctx.lineWidth = line_width;
    ctx.beginPath();
    ctx.closePath();
    ctx.rect(x, y, width, height);
    if (fill_color != '') {
        ctx.fillStyle = fill_color;
        ctx.fill();
    }
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
}
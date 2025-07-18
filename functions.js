const canvas = document.getElementById('cnv');
var ctx = canvas.getContext('2d');


export function drawPoligon(angles, color='black', line_width=1, fill_color='') {
    ctx.strokeStyle = color;
    ctx.shadowBlur = 10;
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
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowBlur = 50;
    drawPoligon(vertices, color, line_width, fill_color);
    ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    ctx.shadowBlur = 0;
}


export function drawO(x, y, width, height, color='black', line_width=1, fill_color='') {
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowBlur = 50;
    drawCircle(x + width / 2, y + height / 2, (width + height) / 4, color, width / 10, fill_color);
    ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    ctx.shadowBlur = 0;
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

export function checkLine(field, cellSize, xOffset, yOffset) {
    let somewone_won = false;

    // проверяем горизонтальные линии
    for (let i = 0; i < 3; i++) {
        if (field[i * 3] === field[i * 3 + 1] && field[i * 3] === field[i * 3 + 2] && field[i * 3] !== "") {
        drawLine(i * 3, i * 3 + 1, i * 3 + 2, cellSize, xOffset, yOffset);
        somewone_won = true;
        }
    }

    // проверяем вертикальные линии
    for (let i = 0; i < 3; i++) {
        if (field[i] === field[i + 3] && field[i] === field[i + 6] && field[i] !== "") {
        drawLine(i, i + 3, i + 6, cellSize, xOffset, yOffset);
        somewone_won = true;
        }
    }

    // проверяем диагональные линии
    if (field[0] === field[4] && field[0] === field[8] && field[0] !== "") {
        drawLine(0, 4, 8, cellSize, xOffset, yOffset);
        somewone_won = true;
    }
    if (field[2] === field[4] && field[2] === field[6] && field[2] !== "") {
        drawLine(2, 4, 6, cellSize, xOffset, yOffset);
        somewone_won = true;
    }

    return somewone_won;
}

function drawLine(cell1, cell2, cell3, cellSize, xOffset, yOffset, somewone_won) {
    const x1 = cell1 % 3 * cellSize + cellSize / 2 + xOffset;
    const y1 = Math.floor(cell1 / 3) * cellSize + cellSize / 2 + yOffset;
    const x2 = cell2 % 3 * cellSize + cellSize / 2 + xOffset;
    const y2 = Math.floor(cell2 / 3) * cellSize + cellSize / 2 + yOffset;
    const x3 = cell3 % 3 * cellSize + cellSize / 2 + xOffset;
    const y3 = Math.floor(cell3 / 3) * cellSize + cellSize / 2 + yOffset;

    const length = 3
    const x4 = x1 - (x3 - x2) / length;
    const y4 = y1 - (y3 - y2) / length;
    const x5 = x3 + (x3 - x2) / length;
    const y5 = y3 + (y3 - y2) / length;

    ctx.strokeStyle = 'red';
    ctx.lineCap = 'round';
    ctx.lineWidth = cellSize / 15;
    ctx.beginPath();
    ctx.quadraticCurveTo(x4, y4, x5, y5);
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    ctx.shadowBlur = 0;
}

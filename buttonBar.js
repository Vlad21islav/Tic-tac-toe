let buttonBarIsOpen = false;
let buttons = [
    ['≡', 'buttonPress()'],
    ['Сейчас тип: ', "buttonFunctions('type'), buttonPress()"],
    ['Сбросить счёт', "buttonFunctions('clear score'), buttonPress()"],
];
let text = '';
let cookies = [localStorage.getItem('game_type'), localStorage.getItem('score')];
export var game_type = 'Классика';
if (cookies[0] != undefined && cookies[0] != '') {
    game_type = cookies[0];
}
export var score = [0, 0];
if (cookies[1] != undefined && cookies[1] != '') {
    score = cookies[1].split(' : ');
}
export var reload = false;
var windowWidth;

window.buttonPress = function() {
    if (buttonBarIsOpen) {
        buttonBarIsOpen = false;
    } else {
        buttonBarIsOpen = true;
    }
    updateButtons();
}

function tack() {
    if (window.innerWidth != windowWidth) {
        windowWidth = window.innerWidth;
        updateButtons();
    }
}

export function updateButtons() {
    const button = document.getElementById('buttons')
    button.innerHTML = '';
    if (!buttonBarIsOpen) {
        button.innerHTML = `
        <button class="button" onclick="buttonPress()">≡</button>
        `
    } else {
        let top = 8;
        for (let i = 0; i < buttons.length; i ++) {
            text = buttons[i][0];
            if (i == 1) {
                text += game_type;
            }
            const buttonHtml = `
            <button style="top: ${top}px; width: ${Math.min(530, (window.innerWidth - 100))};text-align: right;" class="button" onclick="${buttons[i][1]}">${text}</button>
            `
            button.innerHTML += buttonHtml;
            const buttonElement = button.querySelector(`button:nth-child(${i + 1})`);
            top += buttonElement.offsetHeight + 4;
        }
    }
    const score_button = document.getElementById('score')
    score_button.innerHTML = `
    <button class="button score">${score[0]} : ${score[1]}</button>
    `
}

window.buttonFunctions = function(func) {
    switch (func) {
        case 'type':
            if (game_type == 'Классика') {
                game_type = 'Память';
            } else {
                game_type = 'Классика';
            }
            localStorage.setItem('game_type', game_type);
            break;
        case 'clear score':
            score = [0, 0];
            localStorage.setItem('score', score.join(' : '));
            break;
    }
}

window.reload = function() {
    reload = true;
    return reload;
}

export function stopReload() {
    reload = false;
}

setInterval(tack, 10);

let buttonBarIsOpen = false;
let buttons = [
    ['≡', 'buttonPress()'],
    ['Сейчас тип: ', "buttonFunctions('type'), buttonPress()"]
];
let text = '';
export var game_type = 'Классика';
export var reload = false;
var windowWidth = window.innerWidth;

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

function updateButtons() {
    const button = document.getElementById('buttons')
    button.innerHTML = '';
    if (!buttonBarIsOpen) {
        button.innerHTML = `
        <button class="button" onclick="buttonPress()">≡</button>
        `
    } else {
        for (let i = 0; i < buttons.length; i ++) {
            text = buttons[i][0];
            if (i == 1) {
                text += game_type;
            }
            button.innerHTML += `
            <button style="top: ${60 * i + 8}; width: ${Math.min(530, (window.innerWidth - 100))};text-align: right;" class="button" onclick="${buttons[i][1]}">${text}</button>
            `
        }
    }
}

window.buttonFunctions = function(func) {
    switch (func) {
        case 'type':
            if (game_type == 'Классика') {
                game_type = 'Память';
            } else {
                game_type = 'Классика';
            }
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

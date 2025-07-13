let buttonBarIsOpen = false;
let buttons = [
    ['≡', 'buttonPress()'],
    ['Сейчас тип: ', "buttonFunctions('type'), buttonPress()"]
];
let text = '';
export var game_type = 'Классика';

window.buttonPress = function() {
    const button = document.getElementById('buttons')
    if (buttonBarIsOpen) {
        button.innerHTML = `
        <button class="button" onclick="buttonPress()">≡</button>
        `
        buttonBarIsOpen = false
    } else {
        for (let i = 0; i < buttons.length; i ++) {
            text = buttons[i][0];
            if (i == 1) {
                text += game_type;
            }
            button.innerHTML += `
            <button style="top: ${60 * i + 8}; width: 620;text-align: right;" class="button" onclick="${buttons[i][1]}">${text}</button>
            `
        }
        buttonBarIsOpen = true;
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
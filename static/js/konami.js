// a key map of allowed keys
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b',
    54: '6'
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
// the secret code to the devils layer
var devilCode = ['6', '6', '6'];
// a variable to remember the 'position' the user has reached so far.
var specialCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
    // get the value of the key code from the key map
    var key = allowedKeys[e.keyCode];
    // get the value of the required key from the konami code
    var requiredKonamiKey = konamiCode[specialCodePosition];
    var requiredDevilKey = devilCode[specialCodePosition];

    // compare the key with the required key
    if (key == requiredKonamiKey || key == requiredDevilKey) {

        // move to the next key in the konami code sequence
        specialCodePosition++;

        if ((specialCodePosition == devilCode.length) && (key = requiredDevilKey)) {
            activateHell();
            specialCodePosition = 0;
        }
        // if the last key is reached, activate cheats
        if (specialCodePosition == konamiCode.length) {
            activateCheats();
            specialCodePosition = 0;
        }
        
    } else {
        specialCodePosition = 0;
    }
});

function activateCheats() {
    window.location.href = "https://bund.nu";
}

function activateHell() {
    window.location.href = "https://ruc.dk";
}
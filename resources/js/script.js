// decleration of html elements
const generateBtn = document.querySelector('.generate-btn');
const generatorDisplay = document.querySelector('.generator-display');
const pinDisplay = document.querySelector('.pin-display');
const keypad = document.querySelector('.keypad');
const resetBtn = document.querySelector('.reset-btn');
const backspace = document.querySelector('.backspace');
const submitBtn = document.querySelector('.submit-btn');
const successMsg = document.querySelector('.notify-success');
const errorMsg = document.querySelector('.notify-error');
const tryCount = document.querySelector('.try-count');

// variable of try count
let tryLeft = 3;

// event listener for pin generation
generateBtn.addEventListener('click', function () {
    generatorDisplay.value = pinGenerator(4);
    pinDisplay.value = '';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    tryLeft = 3;
    tryCountUpdater();
});

// event listener for updating pin display
keypad.addEventListener('click', function (e) {
    if (e.target.classList.contains('number')) {
        pinDisplay.value += e.target.innerText;
    }
});

// event listener for resetting pin display
resetBtn.addEventListener('click', function () {
    pinDisplay.value = '';
});

// function for backspace
backspace.addEventListener('click', function () {
    pinDisplay.value = pinDisplay.value.slice(0, -1);
});

// event listener for pin validation
submitBtn.addEventListener('click', function () {
    // return if any display is empty
    if (generatorDisplay.value == '' || pinDisplay.value == '') {
        return;
    }
    // return if try count is 0
    if (tryLeft == 0) {
        return;
    }
    // if pin is correct / incorrect
    if (generatorDisplay.value == pinDisplay.value) {
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        tryLeft = 3;
        tryCountUpdater();
    } else {
        successMsg.style.display = 'none';
        errorMsg.style.display = 'block';
        tryLeft--;
        tryCountUpdater();
        // clear secret msg if try count is 0
        if (tryLeft == 0) {
            errorMsg.style.display = 'none';
        }
    }
});

// function for pin generation
function pinGenerator(digitNumber) {
    let pin = '';
    for (let i = 1; i <= digitNumber; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        pin += randomNumber;
    }
    return pin;
}

// function for updating try count
function tryCountUpdater() {
    tryCount.innerText = tryLeft;
}
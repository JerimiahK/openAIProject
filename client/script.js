const form = document.querySelector('form');
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

// Loader Function
function loader(e) {
    e.textContent = '';

    loadInterval = setInterval(() => {
        e.textContent += '.';

        if (e.textContent === "....") {
            e.textContent = '';
        }
    }, 300)
}

// Text Function
function typeText (e, text) {
    let index = 0;

    let interval = setInterval(() => {
        if(index < text.length) {
            e.innnerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// Unique ID Generator
function uniqueID() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
}
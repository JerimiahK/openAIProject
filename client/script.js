const form = document.querySelector('form');
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(e) {
    e.textContent = '';

    loadInterval = setInterval(() => {
        e.textContent += '.';

        if (e.textContent === "....") {
            e.textContent = '';
        }
    }, 300)
}
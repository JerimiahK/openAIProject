import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

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
function uniqueIDGenerator() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

// Chat Stripe Generator
function chatStripe(isAi, value, uniqueID) {
    return (
        `
            <div class="wrapper ${isAi && 'ai'}">
                <div class="chat">
                    <div class="profile">
                        <img
                            src="${isAi ? bot : user}"
                            alt="${isAi ? 'bot' : 'user'}"
                        />
                    </div>
                    <div class="message" id=${uniqueID}>${value}</div>
                </div>
            </div>
        `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form)

    // User Chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

    form.reset();

    // Bot Chatstripe
    const uniqueID = uniqueIDGenerator();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueID);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueID);

    loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        handleSubmit(e);
    }
})
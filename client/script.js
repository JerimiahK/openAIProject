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

// Handle Submit Function
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

    // Fetches data from server
    const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval);
    messageDiv.innerHTML = '';

    if(response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();

        console.log(parsedData);

        typeText(messageDiv, parsedData);
    } else {
        const err = await response.text();

        messageDiv.innerHTML = "Something went wrong";

        alert(err);
    }
}

// Allows user to press enter to submit
form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        handleSubmit(e);
    }
})
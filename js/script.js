const quotes = [
    { title: "Start Doing", content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { title: "Live in the Present", content: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { title: "Keep Getting Up", content: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { title: "Stay Excited", content: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
    { title: "True Success", content: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
    { title: "Value Your Time", content: "Your time is limited, don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { title: "Create Opportunities", content: "Opportunities don't happen, you create them.", author: "Chris Grosser" },
    { title: "Keep Going", content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { title: "Rise Through Hardships", content: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { title: "Believe in Yourself", content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

const quoteTitle = document.getElementById("title");
const quoteContent = document.getElementById("quote-content");
const quoteAuthor = document.getElementById("author");
const timerText = document.getElementById("timeLeft");
const progressCircle = document.querySelector(".timer svg circle + circle");

let quoteIndex = 0;
const intervalSeconds = 8;
let timeLeft = intervalSeconds;
let countdownInterval, animationFrame;

const r = 45;
const circumference = 2 * Math.PI * r;
progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = 0;

function showQuote() {
    const q = quotes[quoteIndex];
    quoteTitle.textContent = q.title;
    quoteContent.textContent = q.content;
    quoteAuthor.textContent = q.author;
    quoteIndex = (quoteIndex + 1) % quotes.length;
}

function startSmoothTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    if (animationFrame) cancelAnimationFrame(animationFrame);

    timeLeft = intervalSeconds;
    timerText.textContent = timeLeft;

    let startTime = Date.now();
    const duration = intervalSeconds * 1000;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const offset = circumference * progress;
        progressCircle.style.strokeDashoffset = offset;

        if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            nextQuote();
        }
    }

    // Update countdown text
    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) timerText.textContent = timeLeft;
    }, 1000);

    // Start animation
    progressCircle.style.strokeDashoffset = circumference;
    requestAnimationFrame(animate);
}

// Move to next quote and restart timer
function nextQuote() {
    showQuote();
    startSmoothTimer();
}

// Initialize
showQuote();
startSmoothTimer();

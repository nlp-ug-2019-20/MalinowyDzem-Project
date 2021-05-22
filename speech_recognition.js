var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const synth = window.speechSynthesis;
let voices = synth.getVoices();

let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 50;

const startButton = document.querySelector('button');
const diagnostic = document.querySelector('.output');
const text = document.querySelector('.text')
const bg = document.querySelector('html');

startButton.onclick = function() {
    recognition.start()
    speak("Welcome to Foodbot! What dish would you like to make? Say the name of the dish or an ingredient.");
       
}

recognition.onresult = function(event) {
    let recognitionResult = event.results[0][0].transcript;
    diagnostic.textContent = 'Result received: ' + recognitionResult;
    if (recognitionResult == "chicken") {
        speak("chicken recipe");
        text.textContent = "chicken recipe";
    }
    if (recognitionResult == "eggs") {
        speak("eggs recipe");
        text.textContent = "eggs recipe";

    }
}
  
function speak(text) {
    let utterThis = new SpeechSynthesisUtterance(text);
    utterThis.lang = "en-US";
    console.log(utterThis);
    synth.speak(utterThis);
}

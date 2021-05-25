const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const synth = window.speechSynthesis;
let voices = synth.getVoices();

let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 50;
voices.lang = 'en-US';

let recipe1 = "chicken recipe"
let recipe2 = "eggs recipe"
let greeting = "Welcome to Foodbot! What dish would you like to make? Say the name of the dish or an ingredient."

const startButton = document.querySelector('button');
const diagnostic = document.querySelector('.output');
const text = document.querySelector('.text')
const bg = document.querySelector('html');

startButton.onclick = function() {
    const speech = new SpeechSynthesisUtterance();
    recognition.start()
    speech.text = greeting;
    window.speechSynthesis.speak(speech);
       
}

recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    readOutLoud(transcript)
  }

  const readOutLoud = (message) => {
    const speech = new SpeechSynthesisUtterance();
        if (message.includes('hello')){
        let finalText = recipe1;
        speech.text = finalText
      } else if (message.includes('hi')) {
        let finalText = recipe2;
        speech.text = finalText
      } 
      speech.lang = 'eng-US';
      window.speechSynthesis.speak(speech);
      }

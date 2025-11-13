// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecognizing = false;

// Speech Synthesis Setup
const synth = window.speechSynthesis;
let voices = [];

// DOM Elements
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const clearBtn = document.getElementById('clear-btn');
const transcriptDiv = document.getElementById('transcript');
const interimResults = document.getElementById('interim-results');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const languageSelect = document.getElementById('language-select');
const voiceSelect = document.getElementById('voice-select');
const speedControl = document.getElementById('speed-control');
const speedValue = document.getElementById('speed-value');
const pitchControl = document.getElementById('pitch-control');
const pitchValue = document.getElementById('pitch-value');

// Initialize Speech Recognition
function initSpeechRecognition() {
    if (!SpeechRecognition) {
        alert('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        return false;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

    recognition.onstart = () => {
        isRecognizing = true;
        updateStatus('listening', 'Listening...');
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    recognition.onend = () => {
        isRecognizing = false;
        updateStatus('idle', 'Ready to listen');
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = 'Error occurred';

        switch(event.error) {
            case 'no-speech':
                errorMessage = 'No speech detected. Please try again.';
                break;
            case 'audio-capture':
                errorMessage = 'No microphone found. Please check your device.';
                break;
            case 'not-allowed':
                errorMessage = 'Microphone permission denied.';
                break;
            default:
                errorMessage = `Error: ${event.error}`;
        }

        updateStatus('error', errorMessage);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        // Display interim results
        if (interimTranscript) {
            interimResults.textContent = interimTranscript;
            interimResults.style.display = 'block';
        }

        // Process final results
        if (finalTranscript) {
            addToTranscript(finalTranscript);
            speakText(finalTranscript);
            interimResults.textContent = '';
            interimResults.style.display = 'none';
        }
    };

    return true;
}

// Add text to transcript
function addToTranscript(text) {
    // Remove placeholder if exists
    const placeholder = transcriptDiv.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    const p = document.createElement('p');
    p.textContent = text;
    p.className = 'transcript-entry';
    transcriptDiv.appendChild(p);

    // Auto-scroll to bottom
    transcriptDiv.scrollTop = transcriptDiv.scrollHeight;
}

// Text-to-Speech function
function speakText(text) {
    if (!synth) {
        console.error('Speech synthesis not supported');
        return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Set selected voice
    const selectedVoice = voiceSelect.value;
    if (selectedVoice) {
        utterance.voice = voices.find(voice => voice.name === selectedVoice);
    }

    // Set speech parameters
    utterance.rate = parseFloat(speedControl.value);
    utterance.pitch = parseFloat(pitchControl.value);

    utterance.onstart = () => {
        updateStatus('speaking', 'Speaking...');
    };

    utterance.onend = () => {
        updateStatus(isRecognizing ? 'listening' : 'idle',
                    isRecognizing ? 'Listening...' : 'Ready to listen');
    };

    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        updateStatus('error', 'Speech synthesis error');
    };

    synth.speak(utterance);
}

// Update status indicator
function updateStatus(state, message) {
    statusIndicator.className = `status-${state}`;
    statusText.textContent = message;
}

// Load available voices
function loadVoices() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';

    if (voices.length === 0) {
        voiceSelect.innerHTML = '<option value="">No voices available</option>';
        return;
    }

    // Group voices by language
    const currentLang = languageSelect.value.split('-')[0];

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;

        // Highlight voices matching current language
        if (voice.lang.startsWith(currentLang)) {
            option.textContent += ' ⭐';
        }

        voiceSelect.appendChild(option);
    });

    // Select default voice for current language
    const defaultVoice = voices.find(voice =>
        voice.lang.startsWith(currentLang) && voice.default
    );
    if (defaultVoice) {
        voiceSelect.value = defaultVoice.name;
    }
}

// Event Listeners
startBtn.addEventListener('click', () => {
    if (!recognition && !initSpeechRecognition()) {
        return;
    }

    try {
        recognition.lang = languageSelect.value;
        recognition.start();
    } catch (error) {
        console.error('Error starting recognition:', error);
        updateStatus('error', 'Failed to start. Please try again.');
    }
});

stopBtn.addEventListener('click', () => {
    if (recognition && isRecognizing) {
        recognition.stop();
        synth.cancel(); // Stop any ongoing speech
    }
});

clearBtn.addEventListener('click', () => {
    transcriptDiv.innerHTML = '<p class="placeholder">Your speech will appear here...</p>';
    interimResults.textContent = '';
    interimResults.style.display = 'none';
    synth.cancel();
    updateStatus('idle', 'Ready to listen');
});

languageSelect.addEventListener('change', () => {
    if (recognition) {
        recognition.lang = languageSelect.value;
    }
    loadVoices();
});

speedControl.addEventListener('input', (e) => {
    speedValue.textContent = `${e.target.value}x`;
});

pitchControl.addEventListener('input', (e) => {
    pitchValue.textContent = `${e.target.value}x`;
});

// Initialize voices
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
}

// Load voices on page load
window.addEventListener('load', () => {
    loadVoices();
    // Try loading voices again after a short delay (some browsers need this)
    setTimeout(loadVoices, 100);
});

// Initialize recognition on page load
initSpeechRecognition();

// Handle page visibility to stop recognition when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRecognizing) {
        recognition.stop();
    }
});

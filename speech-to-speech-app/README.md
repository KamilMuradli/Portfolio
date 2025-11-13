# Speech to Speech Web App

A modern, fully-featured speech-to-speech web application that converts your voice to text and speaks it back to you. Built using the Web Speech API with support for multiple languages and customizable voice options.

## Features

- **Real-time Speech Recognition**: Convert speech to text instantly
- **Text-to-Speech Synthesis**: Hear your transcribed text spoken back to you
- **Multi-language Support**: Choose from 12+ languages including:
  - English (US & UK)
  - Spanish, French, German, Italian
  - Japanese, Korean, Mandarin Chinese
  - Arabic, Russian, Portuguese
- **Voice Customization**:
  - Select from multiple voice options
  - Adjust speech speed (0.5x - 2.0x)
  - Control pitch (0.5x - 2.0x)
- **Live Transcript**: View your speech in real-time with interim results
- **Modern UI/UX**: Beautiful, responsive design that works on all devices
- **Browser-based**: No server or API keys required

## How to Use

1. Open `index.html` in a modern web browser (Chrome, Edge, or Safari recommended)
2. Grant microphone permission when prompted
3. Select your preferred language from the dropdown
4. Choose a voice that suits your preference
5. Click "Start Speaking" and begin talking
6. Watch as your speech is transcribed and spoken back to you
7. Adjust speed and pitch controls to customize the voice output

## Technologies Used

- **Web Speech API**
  - SpeechRecognition for speech-to-text
  - SpeechSynthesis for text-to-speech
- **Vanilla JavaScript** (no frameworks required)
- **HTML5 & CSS3**
- **Responsive Design** for mobile and desktop

## Browser Compatibility

This app works best in browsers that support the Web Speech API:

- ✅ Google Chrome (recommended)
- ✅ Microsoft Edge
- ✅ Safari (macOS & iOS)
- ⚠️ Firefox (limited support)
- ❌ Internet Explorer (not supported)

## Installation

No installation required! Simply:

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start using the app immediately

## File Structure

```
speech-to-speech-app/
├── index.html      # Main HTML structure
├── app.js          # JavaScript logic for speech recognition & synthesis
├── styles.css      # Styling and responsive design
└── README.md       # This file
```

## Features in Detail

### Speech Recognition
- Continuous listening mode
- Real-time interim results
- Automatic language detection based on selection
- Error handling for common issues (no speech, no microphone, etc.)

### Speech Synthesis
- Multiple voice options per language
- Adjustable speech rate and pitch
- Automatic voice selection based on language
- Queue management for speech output

### User Interface
- Status indicators (Ready, Listening, Speaking, Error)
- Transcript history with scrollable view
- Clear button to reset transcript
- Stop button to cancel recognition and speech
- Visual feedback for all actions

## Privacy & Security

- All processing happens in your browser
- No data is sent to external servers
- Microphone access is only active when you start speaking
- No cookies or tracking

## Limitations

- Requires a modern browser with Web Speech API support
- Internet connection may be required for some browser implementations
- Voice quality and availability depend on the browser and operating system
- Continuous recognition may stop after periods of silence

## Future Enhancements

Possible improvements:
- Save/export transcripts
- Multiple speaker detection
- Custom vocabulary support
- Audio visualization
- Translation between languages
- Offline support with local models

## License

This project is open source and available for personal and educational use.

## Troubleshooting

**Microphone not working?**
- Check browser permissions
- Ensure your microphone is connected and enabled
- Try refreshing the page

**Speech recognition not accurate?**
- Speak clearly and at a moderate pace
- Reduce background noise
- Try selecting a different language/dialect

**No voices available?**
- Some browsers need a moment to load voices
- Try refreshing the page
- Check your system's text-to-speech settings

## Contributing

Feel free to fork this project and submit pull requests with improvements!

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

Built with ❤️ using the Web Speech API

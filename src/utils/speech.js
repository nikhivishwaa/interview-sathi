import logger from "./logger";

// Initialize speech recognition
export const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      throw new Error('Speech recognition not supported in this browser');
    }
  
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
  
    return recognition;
  };
  
  // Start speech recognition with callback for results
  export const startSpeechRecognition = (recognition, onResult, onError) => {
    recognition.onresult = (event) => {
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript;
      const isFinal = event.results[resultIndex].isFinal;
      logger({event})
  
      onResult(transcript, isFinal);
    };
  
    recognition.onerror = (event) => {
      onError(new Error(event.error));
    };
  
    try {
      recognition.start();
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Failed to start speech recognition'));
    }
  };
  
  // Stop speech recognition
  export const stopSpeechRecognition = (recognition) => {
    try {
      recognition.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };
  
  // Text to speech
  export const speakText = (text, onStart, onEnd, voiceIndex = 0) => {
    if (!window.speechSynthesis) {
      throw new Error('Speech synthesis not supported in this browser');
    }
  
    window.speechSynthesis.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
  
    if (voices.length > 0) {
      const femaleVoice = voices.find(voice =>
        voice.name.includes('female') ||
        voice.name.includes('Female') ||
        voice.name.includes('Google US English Female')
      );
  
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      } else if (voiceIndex < voices.length) {
        utterance.voice = voices[voiceIndex];
      }
    }
  
    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
  
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
  
    window.speechSynthesis.speak(utterance);
  };
  
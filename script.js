
// ✅ Start Camera
function startCamera() {
  const video = document.getElementById("camera");

  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error("Camera error:", error);
      alert("Camera access denied or not available.");
    });
}

// ✅ Start Voice Recognition
function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN"; // or "hi-IN" for Hindi
  recognition.interimResults = false;

  recognition.onstart = () => {
    speak("Listening...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    speak("You said " + transcript);

    // Display output in box (if any element is present)
    const outputBox = document.querySelector(".output-box");
    if (outputBox) {
      outputBox.textContent = "💬 You said: " + transcript;
    }

    // Optional: Add object memory or emergency matching keywords
    if (transcript.includes("help") || transcript.includes("emergency")) {
      triggerEmergency();
    } else if (transcript.includes("find") || transcript.includes("locate")) {
      locateObject();
    }
  };

  recognition.start();
}

// ✅ Speak a message aloud
function speak(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-IN";
  window.speechSynthesis.speak(utterance);
}

// 🚨 Emergency Mode Placeholder
function triggerEmergency() {
  speak("Emergency mode triggered. Sending location and image...");
  alert("🚨 Emergency feature not implemented yet. Add backend logic here.");
}

// 🧭 Smart Memory Object Locator Placeholder
function locateObject() {
  speak("Searching for known object...");
  alert("🧭 Object memory feature not implemented yet. Add AI or DB logic here.");
}
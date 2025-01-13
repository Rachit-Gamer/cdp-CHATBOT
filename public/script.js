const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
  const question = chatInput.value.trim();
  if (!question) return;

  // Add user message with icon
  addMessage("user-container", "user-message", "user-icon.png", question);
  chatInput.value = "";

  // Fetch chatbot response
  fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Add bot message with icon
      addMessage("bot-container", "bot-message", "chatbot-icon.png", data.answer);
    })
    .catch((error) => {
      addMessage("bot-container", "bot-message", "chatbot-icon.png", "Error: Unable to fetch response.");
      console.error(error);
    });
});

function addMessage(containerClass, messageClass, iconSrc, text) {
  const container = document.createElement("div");
  container.classList.add("message-container", containerClass);

  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.alt = "Icon";
  icon.classList.add("message-icon");

  const message = document.createElement("div");
  message.classList.add("message", messageClass);
  message.textContent = text;

  container.appendChild(icon);
  container.appendChild(message);
  chatLog.appendChild(container);

  // Auto-scroll to the latest message
  chatLog.scrollTop = chatLog.scrollHeight;
}

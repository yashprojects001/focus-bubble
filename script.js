let timer;
let remainingSeconds = 0;

const overlay = document.getElementById("overlay");
const timeDisplay = document.getElementById("time");
const historyList = document.getElementById("history");

loadHistory();

function startFocus() {
  const minutes = parseInt(document.getElementById("minutesInput").value);
  remainingSeconds = minutes * 60;

  updateDisplay();
  overlay.style.display = "flex";

  timer = setInterval(() => {
    remainingSeconds--;
    updateDisplay();

    if (remainingSeconds <= 0) {
      endSession(minutes);
    }
  }, 1000);
}

function stopFocus() {
  clearInterval(timer);
  overlay.style.display = "none";
}

function updateDisplay() {
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  timeDisplay.textContent =
    String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

function endSession(minutes) {
  clearInterval(timer);
  overlay.style.display = "none";
  saveSession(minutes);
  alert("Focus session completed!");
}

function saveSession(minutes) {
  const history = JSON.parse(localStorage.getItem("focusHistory")) || [];
  history.unshift({
    date: new Date().toLocaleString(),
    duration: minutes + " minutes"
  });
  localStorage.setItem("focusHistory", JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  historyList.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("focusHistory")) || [];

  history.forEach(session => {
    const li = document.createElement("li");
    li.textContent = `${session.date} — ${session.duration}`;
    historyList.appendChild(li);
  });
}

// 🕒 Live Clock + Date for Pakistan Time
function updateClockAndDate() {
  const clock = document.getElementById("liveClock");
  const date = document.getElementById("liveDate");

  const now = new Date();

  const timeOptions = {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const dateOptions = {
    timeZone: "Asia/Karachi",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  clock.textContent = new Intl.DateTimeFormat("en-GB", timeOptions).format(now);
  date.textContent = new Intl.DateTimeFormat("en-GB", dateOptions).format(now);
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate();
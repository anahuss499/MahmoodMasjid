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

/// Hijri date calculations//

function updateDates() {
  const now = new Date();

  // Gregorian date
  const gregorianOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const gregorianDate = now.toLocaleDateString('en-US', gregorianOptions);
  document.getElementById('gregorianDate').textContent = gregorianDate;

  // Hijri date
  const hijriOptions = { calendar: 'islamic', day: 'numeric', month: 'long', year: 'numeric' };
  const hijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', hijriOptions).format(now);
  document.getElementById('hijriDate').textContent = hijriDate;
}

// Update every second along with the clock
setInterval(updateDates, 1000);
updateDates();

// Update date and time
function updateDateTime() {
  const dateElement = document.getElementById('current-date');
  const timeElement = document.getElementById('current-time');
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString(undefined, options);
  const time = now.toLocaleTimeString();
  dateElement.textContent = date;
  timeElement.textContent = time;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Call once immediately

// Fetch weather using geolocation
function fetchWeather() {
  const weatherContainer = document.querySelector(".weather-container");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = "d2ec8925817f8a0b8f44a57673f599f4"; // <-- Replace this with your OpenWeatherMap key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const city = data.name;
          const temp = data.main.temp;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;

          weatherContainer.innerHTML = `
            <h3>Weather Report</h3>
            <p><strong>${city}</strong></p>
            <p>${temp}°C, ${description}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
          `;
        })
        .catch(err => {
          weatherContainer.innerHTML = `<h3>Weather Report</h3><p>Error fetching weather data.</p>`;
        });
    }, () => {
      weatherContainer.innerHTML = `<h3>Weather Report</h3><p>Location access denied.</p>`;
    });
  } else {
    weatherContainer.innerHTML = `<h3>Weather Report</h3><p>Geolocation not supported.</p>`;
  }
}

fetchWeather(); // Call on page load

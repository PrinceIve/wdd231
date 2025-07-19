// scripts/weather.js

const currentTempEl = document.querySelector('#current-temp');
const weatherDescEl = document.querySelector('#weather-desc');
const highTempEl    = document.querySelector('#high-temp');
const lowTempEl     = document.querySelector('#low-temp');
const humidityEl    = document.querySelector('#humidity');
const sunriseEl     = document.querySelector('#sunrise');
const sunsetEl      = document.querySelector('#sunset');
const forecastEl    = document.querySelector('#forecast');

const apiKey = '1d23e8c4e32832f53de056b8a97cdf96';
const lat    = 6.52;
const lon    = 3.37;
const units  = 'imperial';

const currentUrl  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const [cRes, fRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);
    if (!cRes.ok || !fRes.ok) throw new Error('Fetch failed');

    const current  = await cRes.json();
    const forecast = await fRes.json();

    // ——— Display Current ———
    currentTempEl.textContent = `Current Temp: ${current.main.temp.toFixed(0)}°F`;
    weatherDescEl.textContent = current.weather[0].description;
    highTempEl.textContent    = `${current.main.temp_max.toFixed(0)}°F`;
    lowTempEl.textContent     = `${current.main.temp_min.toFixed(0)}°F`;
    humidityEl.textContent    = `${current.main.humidity}%`;
    sunriseEl.textContent     = new Date(current.sys.sunrise * 1000).toLocaleTimeString();
    sunsetEl.textContent      = new Date(current.sys.sunset  * 1000).toLocaleTimeString();

    // ——— 3‑Day Forecast (Day & Temp only) ———
    const days = forecast.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 3);

    forecastEl.innerHTML = days.map(d => {
      const date    = new Date(d.dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp    = d.main.temp.toFixed(0);
      // Day and temp on same line:
      return `
        <div class="forecast-day">
          <p>${dayName}: ${temp}°F</p>
        </div>
      `;
    }).join('');


  } catch (err) {
    console.error(err);
    currentTempEl.textContent = 'N/A';
    weatherDescEl.textContent = 'Error loading weather';
  }
}

document.addEventListener('DOMContentLoaded', fetchWeather);

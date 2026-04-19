// ============================================================
//  SUMMER FRIDAYS CONFIG
//  Edit the values below to update the site!
//  After editing, save this file and push to GitHub.
// ============================================================

const SUMMER_FRIDAYS_CONFIG = {

  // Is the backyard OPEN or CLOSED this Friday?
  // Change to "OPEN" or "CLOSED"
  status: "OPEN",

  // What date is the upcoming Friday? (Month Day, Year)
  nextFriday: "April 24, 2026",

  // Optional: a short note shown under the status
  // Leave empty "" if no note needed
  statusNote: "Gates open around 2pm, stay as long as you like!",

  // Upcoming Friday themes
  // Each theme has a "date" and a "title"
  // Set title to "" for Fridays with no theme
  // Past Fridays are automatically hidden on the site
  themes: [
    { date: "April 24, 2026",  title: "" },
    { date: "May 1, 2026",     title: "" },
    { date: "May 8, 2026",     title: "" },
    { date: "May 15, 2026",    title: "" },
    { date: "May 22, 2026",    title: "" },
    { date: "May 29, 2026",    title: "" },
    { date: "June 5, 2026",    title: "Margaritaville — bring margaritas and limes" },
    { date: "June 12, 2026",   title: "Vinyl & Vibes — bring your favorite record" },
    { date: "June 19, 2026",   title: "" },
    { date: "June 26, 2026",   title: "Garden Party — wear florals" },
    { date: "July 3, 2026",    title: "" },
    { date: "July 10, 2026",   title: "" },
    { date: "July 17, 2026",   title: "" },
    { date: "July 24, 2026",   title: "" },
    { date: "July 31, 2026",   title: "" },
    { date: "August 7, 2026",  title: "" },
    { date: "August 14, 2026", title: "" },
    { date: "August 21, 2026", title: "" },
    { date: "August 28, 2026", title: "" },
  ],
};

// ============================================================
//  Everything below runs automatically — no need to edit!
// ============================================================

const WEATHER_CODES = {
  0:  { text: "Clear sky",       icon: "☀️" },
  1:  { text: "Mainly clear",    icon: "🌤" },
  2:  { text: "Partly cloudy",   icon: "⛅" },
  3:  { text: "Overcast",        icon: "☁️" },
  45: { text: "Foggy",           icon: "🌫" },
  48: { text: "Foggy",           icon: "🌫" },
  51: { text: "Light drizzle",   icon: "🌦" },
  53: { text: "Drizzle",         icon: "🌦" },
  55: { text: "Heavy drizzle",   icon: "🌦" },
  56: { text: "Freezing drizzle",icon: "🌧" },
  57: { text: "Freezing drizzle",icon: "🌧" },
  61: { text: "Light rain",      icon: "🌧" },
  63: { text: "Rain",            icon: "🌧" },
  65: { text: "Heavy rain",      icon: "🌧" },
  66: { text: "Freezing rain",   icon: "🌧" },
  67: { text: "Freezing rain",   icon: "🌧" },
  71: { text: "Light snow",      icon: "🌨" },
  73: { text: "Snow",            icon: "🌨" },
  75: { text: "Heavy snow",      icon: "❄️" },
  77: { text: "Snow grains",     icon: "❄️" },
  80: { text: "Light showers",   icon: "🌦" },
  81: { text: "Showers",         icon: "🌧" },
  82: { text: "Heavy showers",   icon: "🌧" },
  85: { text: "Snow showers",    icon: "🌨" },
  86: { text: "Snow showers",    icon: "🌨" },
  95: { text: "Thunderstorm",    icon: "⛈" },
  96: { text: "Thunderstorm",    icon: "⛈" },
  99: { text: "Thunderstorm",    icon: "⛈" },
};

function renderStatus() {
  const container = document.getElementById("status-container");
  const { status, nextFriday, statusNote } = SUMMER_FRIDAYS_CONFIG;
  const isOpen = status.toUpperCase() === "OPEN";

  const banner = document.createElement("div");
  banner.className = `status-banner ${isOpen ? "status-banner--open" : "status-banner--closed"}`;

  const heading = isOpen ? "The backyard is open" : "Closed this week";

  let html = `
    <div class="status-banner__date">${nextFriday}</div>
    <div class="status-banner__divider" aria-hidden="true"></div>
    <div class="status-banner__title">${heading}</div>
  `;

  if (statusNote) {
    html += `<div class="status-banner__note">${statusNote}</div>`;
  }

  banner.innerHTML = html;
  container.appendChild(banner);
}

function renderThemes() {
  const container = document.getElementById("themes-container");
  const { themes } = SUMMER_FRIDAYS_CONFIG;

  if (!themes || themes.length === 0) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = themes.filter(theme => {
    const d = new Date(theme.date + " 23:59:59");
    return d >= today;
  });

  if (upcoming.length === 0) return;

  const list = document.createElement("ul");
  list.className = "theme-list";

  upcoming.forEach((theme, index) => {
    const li = document.createElement("li");
    const hasTheme = theme.title && theme.title.trim() !== "";
    const isNext = index === 0;

    li.className = "theme-item";
    if (hasTheme) li.classList.add("theme-item--themed");
    else li.classList.add("theme-item--no-theme");
    if (isNext) li.classList.add("theme-item--next");

    const d = new Date(theme.date);
    const displayDate = d.toLocaleDateString("en-US", { month: "long", day: "numeric" });

    li.innerHTML = `
      <div class="theme-item__date">${displayDate}</div>
      ${hasTheme
        ? `<div class="theme-item__title">${theme.title}</div>`
        : `<div class="theme-item__no-theme">Open hang — no theme</div>`
      }
    `;

    list.appendChild(li);
  });

  container.appendChild(list);
}

function getNextFridayDate() {
  const now = new Date();
  const day = now.getDay();
  if (day === 5) return now;
  const daysUntilFriday = (5 - day + 7) % 7;
  const friday = new Date(now);
  friday.setDate(now.getDate() + daysUntilFriday);
  return friday;
}

function isFriday() {
  return new Date().getDay() === 5;
}

function formatDateForAPI(date) {
  return date.toISOString().split("T")[0];
}

async function fetchWeather() {
  const container = document.getElementById("weather-container");

  const skeleton = document.createElement("div");
  skeleton.className = "weather-card";
  skeleton.innerHTML = '<div class="weather-card__skeleton"></div>';
  container.appendChild(skeleton);

  try {
    const today = isFriday();
    let label, temp, feelsLike, humidity, wind, weather;

    if (today) {
      const url = "https://api.open-meteo.com/v1/forecast?latitude=40.6892&longitude=-73.9744&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Weather fetch failed");
      const data = await response.json();

      const current = data.current;
      temp = Math.round(current.temperature_2m);
      feelsLike = Math.round(current.apparent_temperature);
      humidity = current.relative_humidity_2m;
      wind = Math.round(current.wind_speed_10m);
      weather = WEATHER_CODES[current.weather_code] || { text: "Unknown", icon: "🌡" };
      label = "Right now in Fort Greene";
    } else {
      const friday = getNextFridayDate();
      const dateStr = formatDateForAPI(friday);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=40.6892&longitude=-73.9744&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,weather_code,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&start_date=${dateStr}&end_date=${dateStr}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Weather fetch failed");
      const data = await response.json();

      const daily = data.daily;
      const high = Math.round(daily.temperature_2m_max[0]);
      const low = Math.round(daily.temperature_2m_min[0]);
      temp = high;
      feelsLike = Math.round(daily.apparent_temperature_max[0]);
      wind = Math.round(daily.wind_speed_10m_max[0]);
      humidity = null;
      weather = WEATHER_CODES[daily.weather_code[0]] || { text: "Unknown", icon: "🌡" };

      const fridayLabel = friday.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
      label = `Forecast for ${fridayLabel}`;

      container.innerHTML = "";

      const card = document.createElement("div");
      card.className = "weather-card";
      card.innerHTML = `
        <div class="weather-card__location">${label}</div>
        <div class="weather-card__divider" aria-hidden="true"></div>
        <span class="weather-card__icon" aria-hidden="true">${weather.icon}</span>
        <div class="weather-card__temp">${high}&deg; <span class="weather-card__temp-low">/ ${low}&deg;</span></div>
        <div class="weather-card__condition">${weather.text} &middot; Feels like ${feelsLike}&deg;</div>
        <div class="weather-card__details">
          <span class="weather-card__detail"><strong>${wind} mph</strong> wind</span>
        </div>
      `;
      container.appendChild(card);
      return;
    }

    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "weather-card";
    card.innerHTML = `
      <div class="weather-card__location">${label}</div>
      <div class="weather-card__divider" aria-hidden="true"></div>
      <span class="weather-card__icon" aria-hidden="true">${weather.icon}</span>
      <div class="weather-card__temp">${temp}&deg;</div>
      <div class="weather-card__condition">${weather.text} &middot; Feels like ${feelsLike}&deg;</div>
      <div class="weather-card__details">
        <span class="weather-card__detail"><strong>${humidity}%</strong> humidity</span>
        <span class="weather-card__detail"><strong>${wind} mph</strong> wind</span>
      </div>
    `;

    container.appendChild(card);
  } catch {
    container.innerHTML = "";
    const card = document.createElement("div");
    card.className = "weather-card";
    card.innerHTML = '<div class="weather-card__error">Weather unavailable — look outside!</div>';
    container.appendChild(card);
  }
}

function initScrollReveal() {
  const sections = document.querySelectorAll("main > section");
  sections.forEach(section => section.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  sections.forEach(section => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderStatus();
  renderThemes();
  fetchWeather();
  initScrollReveal();
});

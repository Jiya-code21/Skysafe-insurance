// const axios = require("axios");

// exports.checkRain = async (req, res) => {
//   const city = req.params.city;

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;

//   const response = await axios.get(url);

//   const weather = response.data.weather[0].main;

//   if (weather === "Rain" || weather === "Thunderstorm") {
//     res.json({
//       message: "Rain detected. Claim trigger possible."
//     });
//   } else {
//     res.json({
//       message: "Weather normal"
//     });
//   }
// };
const axios = require("axios");

exports.checkRain = async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey || apiKey === "your_openweather_api_key") {
      return res.json({
        message: "Weather monitoring is not configured right now",
        monitoringUnavailable: true
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
    const response = await axios.get(url);
    const weather  = response.data.weather[0].main;

    if (weather === "Rain" || weather === "Thunderstorm") {
      return res.json({ message: `Rain detected in ${city}. Claim trigger possible.`, weather });
    }

    res.json({ message: "Weather normal", weather });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ message: "City not found" });
    }
    if (error.response?.status === 401) {
      return res.json({
        message: "Weather monitoring is unavailable right now",
        monitoringUnavailable: true
      });
    }
    res.status(500).json({ message: "Unable to fetch weather data right now" });
  }
};

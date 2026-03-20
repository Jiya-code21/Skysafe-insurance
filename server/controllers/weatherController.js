const axios = require("axios");

exports.checkRain = async (req, res) => {
  const city = req.params.city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`;

  const response = await axios.get(url);

  const weather = response.data.weather[0].main;

  if (weather === "Rain" || weather === "Thunderstorm") {
    res.json({
      message: "Rain detected. Claim trigger possible."
    });
  } else {
    res.json({
      message: "Weather normal"
    });
  }
};
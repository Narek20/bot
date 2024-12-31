const express = require("express");
const { axiosInstance } = require("./axios");
const axios = require("axios");
const { startCronJob } = require("./updates-jon");
const port = process.env.PORT || 4040;
startCronJob();
const app = express();
app.use(express.json());

// app.post("*", async (req, res) => {
//   const { chatId, text } = req.body;
//   console.log(chatId, text);
//   try {
//     const decodedCityName = Buffer.from(text, "base64").toString("utf-8");
//     console.log(decodedCityName);
//     if (decodedCityName === "/start") {
//       const payload = {
//         to: chatId,
//         text: "Please provide the name of the city for which you want to check the weather",
//       };

//       await axiosInstance.post("/sendMessage", payload);

//       res.send("hey");
//     }

//     const { data: weatherData } = await axios.get(
//       `http://api.weatherapi.com/v1/current.json?key=60df8111930d4815b4b223739243012&q=${decodedCityName}`
//     );
//     console.log(weatherData, text, decodedCityName);
//     const payload = {
//       to: chatId,
//       text: `
//         Here are the weather information about the chosen city:
//         Temperature: ${weatherData.current.temp_c}°C
//         Feels Like: ${weatherData.current.feelslike_c}°C
//         Wind Speed: ${weatherData.current.wind_kph}(kph)
//         Cloud: ${weatherData.current.cloud}
//       `,
//     };

//     const data = await axiosInstance.post("/sendMessage", payload);

//     console.log(data.data, "data");
//     return;
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

app.listen(port, (err) => {
  if (err) console.log("Error");

  console.log("App is running successfully!!", port);
});

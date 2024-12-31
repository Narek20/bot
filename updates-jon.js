const cron = require("node-cron");
const axios = require("axios");
const { axiosInstance } = require("./axios");

let counter = 0;

const startCronJob = () => {
  cron.schedule("* * * * * *", async () => {
    counter++;
    if (counter % 3 === 0) {
      try {
        const { data } = await axiosInstance.post("/getUpdates");
        console.log(data);
        for (const message of data.data) {
          const { chatId, text } = message;
          const decodedCityName = Buffer.from(text, "base64").toString("utf-8");

          if (decodedCityName === "/start") {
            const payload = {
              to: chatId,
              text: "Please provide the name of the city for which you want to check the weather",
            };

            await axiosInstance.post("/sendMessage", payload);

            continue;
          }

          const { data: weatherData } = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=60df8111930d4815b4b223739243012&q=${decodedCityName}`
          );
          console.log(weatherData, text, decodedCityName);
          const payload = {
            to: chatId,
            text: `
        Here are the weather information about the chosen city:
        Temperature: ${weatherData.current.temp_c}°C
        Feels Like: ${weatherData.current.feelslike_c}°C
        Wind Speed: ${weatherData.current.wind_kph}(kph)
        Cloud: ${weatherData.current.cloud}
      `,
          };

          console.log(message);

          await axiosInstance.post("/sendMessage", payload);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  });

  console.log("Cron job has been started!");
};

module.exports = { startCronJob };

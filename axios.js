const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://yoai.yophone.com/api/pub",
  timeout: 20000,
  headers: {
    "X-YoAI-API-Key":
      "01940f39-921b-7b55-a0d2-7a716b6e395e:a439ce9cf285925a9ed94121fb3be28a205705e50edecdda3b4a3b3bffdba5e3",
  },
});

module.exports = { axiosInstance };

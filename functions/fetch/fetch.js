const axios = require("axios");

export const handler = async (event, context) => {
  try {
    const city = event.queryStringParameters.city || "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify({ body: response.data }),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

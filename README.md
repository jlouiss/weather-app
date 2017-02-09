## [Weather App](jlouiss.github.io/projects/weather/index.html)
This app shows the current local weather.

The **position** (latitude and longitude) are detected through [http://ip-api.com/json](http://ip-api.com/json).
After retrieving the latitude and longitude I use the coordinates to get the weather condition through the [OpenWeatherMap API](https://openweathermap.org/api).

This app was using `navigator.geolocation` and a promise to get the data. It was more accurate but it wasn't working properly on some browsers.

I refactored the app to improve the readability and to use ip-api.com instead of `navigator.geolocation` and to learn some webpack2.

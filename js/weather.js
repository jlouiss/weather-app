require('../css/style.sass');
import $ from 'jquery';

$(document).ready(function() {

  const geolocationAPIURL = 'http://ip-api.com/json';
  const weatherAPIURL = 'http://api.openweathermap.org/data/2.5/weather?';
  let weatherData = {}

  $.get(geolocationAPIURL)
    .done(getWeatherData)
    .fail(onError);

  function onError(error) {
    console.log('Error: ' + error + '\n\nPlease try to reload the page again.');
  }

  function getWeatherData({ lat, lon }) {
    let appID = 'fcd5700ae93326b1119ec9afd2ca6559'; // 60 calls max per minute
    let weatherRequestURL = `${weatherAPIURL}lat=${lat}&lon=${lon}&appid=${appID}`;

    $.get(weatherRequestURL, function(data) {
        weatherData = {
          isFahrenheit: true,
          temperature: kelvinToFahrenheit(data.main.temp),
          location: data.name,
          currentWeather: data.weather[0].description,
          weatherId: data.weather[0].id,
          icon: {
            id: data.weather[0].icon,
            author: getIconAuthor(data.weather[0].icon)
          }
        };
      })
      .done(displayWeather)
      .fail(onError);
  };

  function displayWeather() {
    let { isFahrenheit, temperature, location, currentWeather, weatherId, icon } = weatherData;

    $('#temperature').html(temperature);
    $('#change-scale').text('F');
    $('#icon').attr('src', getIconPath(icon));
    $('#location').html(location);
    $('#weather').html(currentWeather);

    if (icon.author) {
      $('#author').text(icon.author.name);
      $('#author').attr('href', icon.author.link)
    } else {
      $('small').hide();
    }
  }


  $('#change-scale').on('click', function() {
    console.log(weatherData)
    let { isFahrenheit, temperature } = weatherData
    let symbol = isFahrenheit ? 'F' : 'C';

    if (isFahrenheit) {
      temperature = fahrenheitToCelsius(temperature);
      symbol = 'C';
    } else {
      temperature = celsiusToFahrenheit(temperature);
      symbol = 'F';
    }

    weatherData.isFahrenheit = !weatherData.isFahrenheit;
    weatherData.temperature = temperature;

    $('#temperature').text(temperature);
    $('#change-scale').text(symbol);
  });


  // T(°F) = T(K) × 9/5 - 459.67
  let kelvinToFahrenheit = t => (Math.round((t * 9 / 5 - 459.67) * 100) / 100);

  // T(°C) = (T(°F) - 32) × 5/9
  let fahrenheitToCelsius = t => (Math.round(((t - 32) * 5 / 9) * 100) / 100);

  // T(°F) = T(°C) x 9/5 + 32
  let celsiusToFahrenheit = t => (Math.round(t * 9 / 5 + 32));


  function getIconPath(icon) {
    return (icon.author) ?
      `icons/${icon.id}.svg` :
      `http://openweathermap.org/img/w/${icon.id}.png`;
  }

  // icons credit
  function getIconAuthor(iconId) {
    switch (iconId) {
      case '01d':
      case '01n':
      case '11d':
      case '11n':
        return {
          'name': 'Vectors Market',
          'link': 'http://flaticon.com/authors/vectors-market'
        };
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '09d':
      case '09n':
      case '10d':
      case '10n':
      case '13d':
      case '13n':
      case '50d':
      case '50n':
        return {
          'name': 'Freepik',
          'link': 'http://www.freepik.com'
        };
      case '04d':
      case '04n':
        return {
          'name': 'Popcic',
          'link': 'http://www.flaticon.com/authors/popcic'
        };
      default:
        return null;
    }
  };

});

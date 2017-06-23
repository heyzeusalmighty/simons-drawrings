const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const Promise = require('bluebird');
const config = require('./config/config');
const svgBuild = require('./svgConverter');
const rp = require('request-promise');

const current_url = 'http://api.openweathermap.org/data/2.5/weather?zip=78723,us&APPID=' + config.apiKey;
const forecast_url = 'http://api.openweathermap.org/data/2.5/forecast?zip=78723,us&APPID=' + config.apiKey;

function makeCall(url, callback) {
    const options = {
        url: url
    }
    request.get(options, callback);
}


function makeBothCalls(cb) {

    // get current
    rp({uri: current_url})
    .then(current => {
        // console.log('current ::::::::::::::::::::::');
        // console.log(current);
        rp({uri: forecast_url})
        .then(forecast => {

            // console.log(chalk.red('forecast'), chalk.green(forecast));
            let currentWeather = currentWeatherCall(current);
            let fourCast = forecastCallProcessing(forecast);
            console.log(currentWeather);


            //temp, shortDescription, weatherIdn, forecast            
            buildSvg(currentWeather.temp, currentWeather.shortDescription, currentWeather.weatherId, fourCast);
        });
    });
}


function currentWeatherCall(body) {    
    
    // console.log(chalk.green('body'), chalk.blue(body));

    let jsonBody = JSON.parse(body);

    let shortDescription = jsonBody.weather[0].main;
    let desc = jsonBody.weather[0].description;
    let weatherId = parseInt(jsonBody.weather[0].id);
    let currentTemp = jsonBody.main.temp;
    let temp = convertToF(currentTemp);
    return { temp, shortDescription, weatherId };

    // console.log(chalk.green('main'), chalk.blue(shortDescription));
    // console.log(chalk.green('desc'), chalk.blue(desc));
    // console.log(chalk.green('weatherId'), chalk.blue(weatherId));        
    // console.log(chalk.green('kelvin temp'), chalk.blue(currentTemp));
    // console.log(chalk.green('f temp'), chalk.blue(fTemp));

    // buildSvg(temp, shortDescription, weatherId);
}

function forecastCallProcessing(body) {
    let jsonBody = JSON.parse(body);

    let forecast = [];
    
    jsonBody.list.forEach(day => {

        let date = new Date(day.dt * 1000);        
        


        if (date.toString().indexOf('13:00:00') > -1) {

            console.log(chalk.green('body'), chalk.blue(JSON.stringify(day.main)));

            let max = convertToF(day.main.temp_max);
            let min = convertToF(day.main.temp_min);
            let superDate = getDate(date);

            // console.log(chalk.green('dt'), chalk.blue(date.toString()));
            // console.log(chalk.green('main.temp_max'), chalk.blue(max));
            // console.log(chalk.green('main.temp_min'), chalk.blue(min));
            // console.log(chalk.green('weather[0].id'), chalk.blue(day.weather[0].id));
            // console.log(chalk.green('weather[0].main'), chalk.blue(day.weather[0].main));
            // console.log(chalk.red(superDate));
            forecast.push({
                max,
                min,
                weatherId: day.weather[0].id,
                shortDescription: day.weather[0].main,
                date: superDate
            });

        }

    });

    return forecast;
}

function getDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${month}/${day}`;
}

function convertToF(temp) {
    return Math.floor(9/5*(temp -273)+32);
}

function buildSvg(temp, shortDescription, weatherId, forecast) {
    let svg = svgBuild.build(temp, shortDescription, weatherId, forecast);
    fs.writeFile('output/test.svg', svg, (err) => {
        if (err) console.log(erff);
        console.log('done writing');
    });
}


function convertSvg(svg) {
    // convert 
    require('svg2png')('output/dino.svg', 'output/dino.png', function(err) {
        if(err) {
            console.log('An error occurred during conversion: ', err);
        }
    });
}

makeBothCalls();

// let currentWeather = makeCall(forecast, forecastCall);
// let test = svgBuild.extractPathFromIcon('icons/gumballs.svg');
// console.log(test);
// buildSvg(78, 'misty', 666);
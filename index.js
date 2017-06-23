const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const Promise = require('bluebird');
const config = require('./config/config');
const svgBuild = require('./svgConverter');
const rp = require('request-promise');
const _ = require('lodash');

const current_url = 'http://api.openweathermap.org/data/2.5/weather?zip=78723,us&APPID=' + config.apiKey;
const forecast_url = 'http://api.openweathermap.org/data/2.5/forecast?zip=78723,us&APPID=' + config.apiKey;

function makeCall(url, callback) {
    const options = {
        url: url
    }
    request.get(options, callback);
}


function makeBothCalls(cb) {
    rp({uri: current_url})
    .then(current => {        
        rp({uri: forecast_url})
        .then(forecast => {
            let currentWeather = currentWeatherCall(current);
            let fourCast = forecastCallProcessing(forecast);          
            buildSvg(currentWeather, fourCast);
        });
    });
}


function currentWeatherCall(body) {    
    let jsonBody = JSON.parse(body);

    let shortDescription = jsonBody.weather[0].main;
    let desc = jsonBody.weather[0].description;
    let weatherId = parseInt(jsonBody.weather[0].id);
    let currentTemp = jsonBody.main.temp;
    let temp = convertToF(currentTemp);
    return { temp, shortDescription, weatherId };
}

function forecastCallProcessing(body) {
    let jsonBody = JSON.parse(body);
    let forecast = [];
    
    jsonBody.list.forEach(day => {
        
        let date = new Date(day.dt * 1000);
        let simpleDate = getDate(date);
        let dateAndHours = getDateAndTime(date);
        // console.log(chalk.green(dateAndHours), chalk.blue(day.main.temp_min), chalk.red(day.main.temp_max));

        let dIdx = _.findIndex(forecast, { 'date': simpleDate });
        if (dIdx > -1) {
            let max = convertToF(day.main.temp_max);
            let min = convertToF(day.main.temp_min);
            if (max > forecast[dIdx].max) 
                forecast[dIdx].max = max;

            if (min < forecast[dIdx].min)
                forecast[dIdx].min = min;    

            // console.log(chalk.cyan(forecast[dIdx].date), chalk.green(forecast[dIdx].max), chalk.yellow(max));

            if (date.toString().indexOf('13:00:00') > -1) {
                forecast[dIdx].weatherId = day.weather[0].id;
                forecast[dIdx].shortDescription = day.weather[0].main;
            }

        } else {            
            forecast.push({ 
                date: simpleDate, 
                max: convertToF(day.main.temp_max), 
                min: convertToF(day.main.temp_min)
            });
        }

        // if this date exists
            // is written min lower?
            // is written max higher?

        // if date does not exist
            // add date, min, max

        // if time is 1 PM
            // add weatherId & shortDescription
        


        // if (forecast[])


        // if (date.toString().indexOf('13:00:00') > -1) {

        //     // console.log(chalk.green('body'), chalk.blue(JSON.stringify(day.main)));

        //     let max = convertToF(day.main.temp_max);
        //     let min = convertToF(day.main.temp_min);
        //     let superDate = getDate(date);

        //     forecast.push({
        //         max,
        //         min,
        //         weatherId: day.weather[0].id,
        //         shortDescription: day.weather[0].main,
        //         date: superDate
        //     });

        // }

    });

    return forecast;
}

function getDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${month}/${day}`;
}

function getDateAndTime(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    return `${month}/${day} - ${hour}`;
}

function convertToF(temp) {
    return Math.floor(9/5*(temp -273)+32);
}

function buildSvg(currentWeather, forecast) {
    let svg = svgBuild.build(currentWeather, forecast);
    fs.writeFile('output/test.svg', svg, (err) => {
        if (err) console.log(erff);
        console.log('done writing');
    });
}

makeBothCalls();

// let currentWeather = makeCall(forecast, forecastCall);
// let test = svgBuild.extractPathFromIcon('icons/gumballs.svg');
// console.log(test);
// buildSvg(78, 'misty', 666);
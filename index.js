const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const fs = require('fs');
const config = require('./config/config');
const svgBuild = require('./svgConverter');

const weatherMap = 'http://api.openweathermap.org/data/2.5/weather?zip=78723,us&APPID=' + config.apiKey;

function makeCall(url, callback) {
    const options = {
        url: url
    }
    request.get(options, callback);
}

function firstCalls(error, response, body) {    
    let jsonBody = JSON.parse(body);

    // console.log(chalk.green('body'), chalk.blue(body));

    let shortDescription = jsonBody.weather[0].main;
    let desc = jsonBody.weather[0].description;
    let weatherId = parseInt(jsonBody.weather[0].id);
    let currentTemp = jsonBody.main.temp;
    let temp = convertToF(currentTemp);

    // console.log(chalk.green('main'), chalk.blue(shortDescription));
    // console.log(chalk.green('desc'), chalk.blue(desc));
    // console.log(chalk.green('weatherId'), chalk.blue(weatherId));        
    // console.log(chalk.green('kelvin temp'), chalk.blue(currentTemp));
    // console.log(chalk.green('f temp'), chalk.blue(fTemp));

    buildSvg(temp, shortDescription, weatherId);
}

function convertToF(temp) {
    return Math.floor(9/5*(temp -273)+32);
}

function convertSvg(svg) {
    // convert 
    require('svg2png')('output/dino.svg', 'output/dino.png', function(err) {
        if(err) {
            console.log('An error occurred during conversion: ', err);
        }
    });
}

function buildSvg(temp, shortDescription, weatherId) {
    let svg = svgBuild.build(temp, shortDescription, weatherId);
    fs.writeFile('output/test.svg', svg, (err) => {
        if (err) console.log(erff);
        console.log('done writing');
    });
}

// let currentWeather = makeCall(weatherMap, firstCalls);
// let test = svgBuild.extractPathFromIcon('icons/gumballs.svg');
// console.log(test);
buildSvg(78, 'misty', 666);
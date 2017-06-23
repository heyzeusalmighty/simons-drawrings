const fs = require('fs');
const cheerio = require('cheerio');
const chalk = require('chalk');

function build(currentTemp, shortDescription, weatherId, forecast) {

    let weatherImage = getSvgFromWeatherId(weatherId);
    // max: day.main.temp_max,
    // min: day.main.temp_min,
    // weatherId: day.weather[0].id,
    // shortDescription: day.weather[0].main,
    // date: getDate(date)

    

    let svgForecast;
    let startingX = 75;
    forecast.forEach(day => {
        day.svg = getSvgFromWeatherId(day.weatherId);
        svgForecast += buildForecast(day, startingX, 390);
        startingX += 100;
    });



    // let dayOne = buildForecast(forecast[0], 10, 0);
    // let dayTwo = buildForecast(forecast[1], 110, 0);
    // console.log(dayOne);

    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">

            <g id="outside">

                <svg xmlns="http://www.w3.org/2000/svg" x="10" y="40" height="300" width="300" viewBox="0 0 100 100">
                    ${weatherImage}
                </svg>

                <text x="450" y="128" font-family="Verdana" 
                    font-size="128" 
                    text-anchor="middle" 
                    alignment-baseline="auto">
                    ${currentTemp}
                </text>

                <text x="450" y="250" font-family="Verdana" font-size="72" text-anchor="middle">
                    ${shortDescription}
                </text>
            </g>
            <g id="forecast">
                ${svgForecast}
            </g>
            <g id="inside">
                
                <text x="75" y="525" font-family="Verdana" font-size="20" text-anchor="middle">Living</text>
                <text x="75" y="600" font-family="Verdana" font-size="72" text-anchor="middle">75</text>
                <text x="75" y="675" font-family="Verdana" font-size="48" text-anchor="middle">25</text>

                <text x="225" y="525" font-family="Verdana" font-size="20" text-anchor="middle">Guest</text>
                <text x="225" y="600" font-family="Verdana" font-size="72" text-anchor="middle">75</text>
                <text x="225" y="675" font-family="Verdana" font-size="48" text-anchor="middle">25</text>

                <text x="375" y="525" font-family="Verdana" font-size="20" text-anchor="middle">Master</text>
                <text x="375" y="600" font-family="Verdana" font-size="72" text-anchor="middle">75</text>
                <text x="375" y="675" font-family="Verdana" font-size="48" text-anchor="middle">25</text>

                <text x="525" y="525" font-family="Verdana" font-size="20" text-anchor="middle">Office</text>
                <text x="525" y="600" font-family="Verdana" font-size="72" text-anchor="middle">75</text>
                <text x="525" y="675" font-family="Verdana" font-size="48" text-anchor="middle">25</text>

            </g>
        </svg>`;
}


function getSvgFromWeatherId(weatherId) {
    let icon = getIconFromWeatherId(weatherId);
    // console.log('my icon => ', chalk.green(icon));
    return extractPathFromIcon(`icons/${icon}`);
}

function extractPathFromIcon(path) {

    let icon = fs.readFileSync(path, 'utf8');
    
    if (path === 'icons/park.svg' || path === 'icons/gumballs.svg') {
        return icon;
    } 

    let $ = cheerio.load(icon);
    let ddd = $('path').attr('d');
    ddd = `<path d="${ddd}" />`;
    return ddd;
}

function buildForecast(day, x, y) {
    // x
    // 10, 15, 50, 30
    // 400, 470, 495

    return `
        <svg xmlns="http://www.w3.org/2000/svg" x="${x}" y="${y}" height="50" width="50" viewBox="0 0 100 100">
            ${day.svg}
        </svg>
        <text x="${x + 5}" y="${y + 70}" font-family="Verdana" font-size="20" text-anchor="middle">
            ${day.min}
        </text>
        <text x="${ x + 40}" y="${y + 70}" font-family="Verdana" font-size="20" text-anchor="middle">
            ${day.max}
        </text>
        <text x="${x + 20}" y="${y + 95}" font-family="Verdana" font-size="20" text-anchor="middle">
            ${day.date}
        </text>
    `;
}


function getIconFromWeatherId(weatherId) {
    // console.log(chalk.blue('weatherid'), chalk.green(weatherId));

    // console.log(typeof weatherId);
    // console.log('equals 800', (weatherId === 800));

    switch(true) {

        // clear skies man
        case weatherId === 800:
            return 'gumballs.svg';

        // thunderstorms
        case (weatherId >= 200 && weatherId <= 232):
            return 'tsra.svg';
        
        // drizzle
        case (weatherId >= 300 && weatherId <= 310):
            return 'ip.svg';

        // drizzle rain
        case (weatherId >= 311 && weatherId <= 321):
            return 'raip.svg';

        // rain
        case (weatherId >= 500 && weatherId <= 531):
            return 'ra.svg';

        // snow
        case (weatherId >= 600 && weatherId <= 622):
            return 'ip.svg';
        
        // mist
        case weatherId === 701:
            return 'mist.svg';
        
        // smoke, duh
        case weatherId === 711:
            return 'smoke.svg';
        
        // dust
        case weatherId === 761:
            return 'dust.svg';

        // tornado
        case weatherId === 781:
        case weatherId === 900:
            return 'nsurtsra.svg';
        
        // light / scattered clouds
        case weatherId === 801:
        case weatherId === 802:
            return 'few.svg';

        // cloudy
        case weatherId === 803:
            return 'bkn.svg';

        // overcast
        case weatherId === 804:
            return 'ovc.svg';

        // wind
        case weatherId === 905:
            return 'wind.svg';
        
        //more winds
        case (weatherId >= 951 && weatherId <= 962):
            return 'wind.svg';

        

        // dunno man
        default:
            return 'park.svg';


    }
}



module.exports = {
    build,
    extractPathFromIcon
}




// bkn         - cloudy day
// dust        - dusty
// few         - scattered cloudy
// fg          - fog
// frza        - freezing rain
// fzrara      - freezing rain and rain
// hi_shwrs    - i dunno, rain and then sun?
// hi_tsra     - same boat as above but with thunderstorms
// ip          - drizzle
// mist        - mist
// mix         - rain and snow
// nsurtsra    - tornado
// ovc         - overcast
// ra          - rain
// raip        - rain and drizzle
// rasn        - rain and snow
// sct         - scattered clouds
// shra        - light rain
// skc         - sunny
// smoke       - smoke
// sn          - snow
// tsra        - thunderstorms
// wind        - wind, duh

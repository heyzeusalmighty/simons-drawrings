const fs = require('fs');
const cheerio = require('cheerio');
const chalk = require('chalk');

function build(currentTemp, shortDescription, weatherId) {

    let weatherImage = getSvgFromWeatherId(weatherId);
    console.log('weatherImage', chalk.green(weatherImage));

    return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">

            <g id="outside">

                <svg xmlns="http://www.w3.org/2000/svg" x="10" y="40" height="300" width="300" viewBox="0 0 100 100">
                    <path d="${weatherImage}" />
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
    console.log('my icon => ', chalk.green(icon));
    return extractPathFromIcon(`icons/${icon}`);
}

function extractPathFromIcon(path) {

    let icon = fs.readFileSync(path, 'utf8');
    let $ = cheerio.load(icon);

    let ddd = $('path').attr('d');

    return ddd;
}


function getIconFromWeatherId(weatherId) {
    console.log(chalk.blue('weatherid'), chalk.green(weatherId));

    console.log(typeof weatherId);
    console.log('equals 800', (weatherId === 800));

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
            return 'grey_national-parks.svg';


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

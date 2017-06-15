const fs = require('fs');
const cheerio = require('cheerio');
const chalk = require('chalk');

function build(currentTemp, shortDescription, weatherId) {

    let weatherImage = getSvgFromWeatherId(weatherId);
    console.log('weatherImage', chalk.green(weatherImage));

    return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">

            <g id="outside">

                <svg xmlns="http://www.w3.org/2000/svg" x="10" y="40" height="300" width="300" viewBox="0 0 100 100">
                    <path d="M30.219,2c-7.202,0-13.031,5.8326-13.031,13.031,0,0.163,0.024,0.306,0.031,0.469-0.163-0.011-0.306-0.031-0.469-0.031-3.875,0-7,3.125-7,7v0.156c-0.5544-0.166-1.112-0.281-1.7188-0.281-3.3236,0-6.0312,2.679-6.0312,6,0,3.323,2.7076,4.594,6.0312,4.594h38.657c5.696,0,10.312-4.615,10.312-10.313,0-5.697-4.616-10.313-10.312-10.313-1.288,0-2.525,0.259-3.657,0.688-0.983-6.2265-6.313-11-12.812-11zm63.719,1.9375l-90,90,2.125,2.124,90-90-2.124-2.125zm-2.313,12.75c-0.939,0.03-1.808,0.36-2.469,0.906-0.833,0.688-1.344,1.706-1.344,2.906v23.75c-1.668,1.254-2.648,3.145-2.656,5.219-0.007,2.748,1.643,5.058,4,6.031,0.763,0.315,1.596,0.495,2.469,0.5,0.786,0.005,1.56-0.121,2.25-0.375,2.492-0.909,4.205-3.338,4.25-6.031,0.034-2.111-0.945-4.06-2.656-5.344v-23.906c0-1.267-0.618-2.325-1.594-2.969-0.621-0.411-1.412-0.662-2.219-0.687h-0.031zm0.031,1.718c0.456,0.012,0.869,0.144,1.219,0.375,0.544,0.359,0.906,0.951,0.906,1.657v24.781c1.577,0.786,2.657,2.399,2.657,4.281,0,2.65-2.132,4.812-4.782,4.812s-4.812-2.162-4.812-4.812c0-1.882,1.079-3.495,2.656-4.281v-24.688c0-0.668,0.286-1.242,0.75-1.625,0.372-0.307,0.876-0.486,1.406-0.5zm-76.75,17.938l-4.9685,13.625,1.0625,0.406,5.125-14.031h-1.219zm5.688,0l-4.969,13.625,1.063,0.406,5.124-14.031h-1.218zm5.687,0l-4.969,13.625,1.063,0.406,5.094-14.031h-1.188zm5.657,0l-4.938,13.625,1.062,0.406,5.094-14.031h-1.218zm5.687,0l-4.969,13.625,1.063,0.406,5.125-14.031h-1.219zm5.687,0l-4.968,13.625,1.062,0.406,5.094-14.031h-1.188zm47.032,5.062v4.375c-1.546,0.535-2.656,1.991-2.656,3.719,0,2.18,1.788,3.938,3.968,3.938,2.181,0,3.938-1.758,3.938-3.938,0-1.728-1.11-3.184-2.656-3.719v-4.375h-2.594zm-19.125,8.219c-7.202,0-13.031,5.833-13.031,13.031,0,0.163,0.024,0.337,0.031,0.5-0.163-0.011-0.306-0.062-0.469-0.062-3.875,0-7,3.156-7,7.031v0.125c-0.554-0.166-1.112-0.281-1.719-0.281-3.323,0-6.031,2.679-6.031,6,0,3.323,2.708,4.593,6.031,4.593h38.657c5.696,0.002,10.312-4.614,10.312-10.312,0-5.697-4.616-10.312-10.312-10.312-1.288,0-2.525,0.258-3.657,0.687-0.983-6.227-6.313-11-12.812-11zm-15.313,34.344l-4.968,13.656,1.062,0.375,5.125-14.031h-1.219zm5.688,0l-4.969,13.656,1.063,0.375,5.124-14.031h-1.218zm5.687,0l-4.969,13.656,1.063,0.375,5.094-14.031h-1.188zm5.657,0l-4.938,13.656,1.062,0.375,5.094-14.031h-1.218zm5.687,0l-4.969,13.656,1.063,0.375,5.125-14.031h-1.219zm5.687,0l-4.968,13.656,1.062,0.375,5.094-14.031h-1.188z"/>
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

{/*<svg xmlns="http://www.w3.org/2000/svg" x="10" y="40" height="300" width="300" viewBox="0 0 100 100">
    <path d="M30.219,2c-7.202,0-13.031,5.8326-13.031,13.031,0,0.163,0.024,0.306,0.031,0.469-0.163-0.011-0.306-0.031-0.469-0.031-3.875,0-7,3.125-7,7v0.156c-0.5544-0.166-1.112-0.281-1.7188-0.281-3.3236,0-6.0312,2.679-6.0312,6,0,3.323,2.7076,4.594,6.0312,4.594h38.657c5.696,0,10.312-4.615,10.312-10.313,0-5.697-4.616-10.313-10.312-10.313-1.288,0-2.525,0.259-3.657,0.688-0.983-6.2265-6.313-11-12.812-11zm63.719,1.9375l-90,90,2.125,2.124,90-90-2.124-2.125zm-2.313,12.75c-0.939,0.03-1.808,0.36-2.469,0.906-0.833,0.688-1.344,1.706-1.344,2.906v23.75c-1.668,1.254-2.648,3.145-2.656,5.219-0.007,2.748,1.643,5.058,4,6.031,0.763,0.315,1.596,0.495,2.469,0.5,0.786,0.005,1.56-0.121,2.25-0.375,2.492-0.909,4.205-3.338,4.25-6.031,0.034-2.111-0.945-4.06-2.656-5.344v-23.906c0-1.267-0.618-2.325-1.594-2.969-0.621-0.411-1.412-0.662-2.219-0.687h-0.031zm0.031,1.718c0.456,0.012,0.869,0.144,1.219,0.375,0.544,0.359,0.906,0.951,0.906,1.657v24.781c1.577,0.786,2.657,2.399,2.657,4.281,0,2.65-2.132,4.812-4.782,4.812s-4.812-2.162-4.812-4.812c0-1.882,1.079-3.495,2.656-4.281v-24.688c0-0.668,0.286-1.242,0.75-1.625,0.372-0.307,0.876-0.486,1.406-0.5zm-76.75,17.938l-4.9685,13.625,1.0625,0.406,5.125-14.031h-1.219zm5.688,0l-4.969,13.625,1.063,0.406,5.124-14.031h-1.218zm5.687,0l-4.969,13.625,1.063,0.406,5.094-14.031h-1.188zm5.657,0l-4.938,13.625,1.062,0.406,5.094-14.031h-1.218zm5.687,0l-4.969,13.625,1.063,0.406,5.125-14.031h-1.219zm5.687,0l-4.968,13.625,1.062,0.406,5.094-14.031h-1.188zm47.032,5.062v4.375c-1.546,0.535-2.656,1.991-2.656,3.719,0,2.18,1.788,3.938,3.968,3.938,2.181,0,3.938-1.758,3.938-3.938,0-1.728-1.11-3.184-2.656-3.719v-4.375h-2.594zm-19.125,8.219c-7.202,0-13.031,5.833-13.031,13.031,0,0.163,0.024,0.337,0.031,0.5-0.163-0.011-0.306-0.062-0.469-0.062-3.875,0-7,3.156-7,7.031v0.125c-0.554-0.166-1.112-0.281-1.719-0.281-3.323,0-6.031,2.679-6.031,6,0,3.323,2.708,4.593,6.031,4.593h38.657c5.696,0.002,10.312-4.614,10.312-10.312,0-5.697-4.616-10.312-10.312-10.312-1.288,0-2.525,0.258-3.657,0.687-0.983-6.227-6.313-11-12.812-11zm-15.313,34.344l-4.968,13.656,1.062,0.375,5.125-14.031h-1.219zm5.688,0l-4.969,13.656,1.063,0.375,5.124-14.031h-1.218zm5.687,0l-4.969,13.656,1.063,0.375,5.094-14.031h-1.188zm5.657,0l-4.938,13.656,1.062,0.375,5.094-14.031h-1.218zm5.687,0l-4.969,13.656,1.063,0.375,5.125-14.031h-1.219zm5.687,0l-4.968,13.656,1.062,0.375,5.094-14.031h-1.188z"/>
</svg>*/}

function getSvgFromWeatherId(weatherId) {
    let icon = getIconFromWeatherId(weatherId);
    console.log('my icon => ', chalk.green(icon));
    return extractPathFromIcon(`icons/${icon}`);
}

function extractPathFromIcon(path) {

    let icon = fs.readFileSync(path, 'utf8');
    console.log('hi i am an icon', icon);
    // let $ = cheerio.load(path, assign({ xmlMode: true}));
    let $ = cheerio.load(path);
    let allThePaths ='';
    $('[path]').each(() => {
        let d = $(this).attr('d');
        allThePaths += d.replace(/\s+/g, '')+' ';
        console.log('allThePaths', allThePaths);
    });
    return allThePaths;
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
    build: build
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



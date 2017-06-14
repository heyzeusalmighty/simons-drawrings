












function convertSvg(svg) {
    // convert 
    require('svg2png')('output/dino.svg', 'output/dino.png', function(err) {
        if(err) {
            console.log('An error occurred during conversion: ', err);
        }
    });
}
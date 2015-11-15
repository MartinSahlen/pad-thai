var iconNumbers = {
    sunny: [1], // Only sun
    fair: [2], // Light cloud and sun
    cloudy: [4, 9, 10, 11, 12, 13, 14, 22, 23, 30, 31, 32, 33, 34, 46, 47, 48, 49, 50], // Dark cloud and sun
    partlyCloudy: [3, 5, 6, 7, 8, 20, 21, 24, 25, 26, 27, 28, 29, 40, 41, 42, 43, 44, 45], // Dark cloud
    fog: [15], // Fog
    lightRain: [7, 12, 20, 23, 24, 30, 40, 46], // 1 rain drop
    mediumRain: [5, 6, 9, 22, 27, 32, 43, 48], // 2 rain drops
    heavyRain: [10, 11, 25, 41], // 3 rain drops
    thunder: [6, 11, 14, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], // Lightning
    lightSnow: [7, 12, 20, 23, 27, 28, 32, 33, 43, 44, 48, 49], // 1 snow flake
    mediumSnow: [8, 13, 14, 21], // 2 snow flakes
    heavySnow: [29, 34, 45, 50], // 3 snow flakes
    snowAndRain: [26, 31, 42, 47] // Snow and rain
};

function getWeatherMap() {
    return iconNumbers;
}

function getTypeByNumber(number) {
    number = parseInt(number, 10);

    if(iconNumbers.sunny.indexOf(number) !== -1) {
        return 'SUNNY';
    }
    if(iconNumbers.fair.indexOf(number) !== -1) {
        return 'FAIR';
    }
    if(iconNumbers.cloudy.indexOf(number) !== -1) {
        return 'CLOUDY';
    }
    if(iconNumbers.partlyCloudy.indexOf(number) !== -1) {
        return 'PARTLY_CLOUDY';
    }
    if(iconNumbers.fog.indexOf(number) !== -1) {
        return 'FOG';
    }
    if(iconNumbers.lightRain.indexOf(number) !== -1) {
        return 'LIGHT_RAIN';
    }
    if(iconNumbers.mediumRain.indexOf(number) !== -1) {
        return 'MEDIUM_RAIN';
    }
    if(iconNumbers.heavyRain.indexOf(number) !== -1) {
        return 'HEAVY_RAIN';
    }
    if(iconNumbers.thunder.indexOf(number) !== -1) {
        return 'THUNDER';
    }
    if(iconNumbers.lightSnow.indexOf(number) !== -1) {
        return 'LIGHT_SNOW';
    }
    if(iconNumbers.mediumSnow.indexOf(number) !== -1) {
        return 'MEDIUM_SNOW';
    }
    if(iconNumbers.heavySnow.indexOf(number) !== -1) {
        return 'HEAVY_SNOW';
    }
    if(iconNumbers.snowAndRain.indexOf(number) !== -1) {
        return 'SNOW_AND_RAIN';
    }

    return 'UNKNOWN';
}

function getTagsByNumber(number) {
    number = parseInt(number, 10);

    var tags = [];

    if(iconNumbers.sunny.indexOf(number) !== -1) {
        tags.push('pop');
    }
    if(iconNumbers.fair.indexOf(number) !== -1) {
        tags.push('disco');
    }
    if(iconNumbers.cloudy.indexOf(number) !== -1) {
        tags.push('country');
    }
    if(iconNumbers.partlyCloudy.indexOf(number) !== -1) {
        tags.push('dancehall');
    }
    if(iconNumbers.fog.indexOf(number) !== -1) {
        tags.push('classical');
    }
    if(iconNumbers.lightRain.indexOf(number) !== -1) {
        tags.push('piano');
    }
    if(iconNumbers.mediumRain.indexOf(number) !== -1) {
        tags.push('reggae');
    }
    if(iconNumbers.heavyRain.indexOf(number) !== -1) {
        tags.push('dubstep');
    }
    if(iconNumbers.thunder.indexOf(number) !== -1) {
        tags.push('metal');
    }
    if(iconNumbers.lightSnow.indexOf(number) !== -1) {
        tags.push('techno');
    }
    if(iconNumbers.mediumSnow.indexOf(number) !== -1) {
        tags.push('trance');
    }
    if(iconNumbers.heavySnow.indexOf(number) !== -1) {
        tags.push('indie');
    }
    if(iconNumbers.snowAndRain.indexOf(number) !== -1) {
        tags.push('latino');
    }

    return tags;
}

function getGenreByNumber(number) {
    number = parseInt(number, 10);

    if(iconNumbers.sunny.indexOf(number) !== -1) {
        return 'pop';
    }
    if(iconNumbers.fair.indexOf(number) !== -1) {
        return 'disco';
    }
    if(iconNumbers.cloudy.indexOf(number) !== -1) {
        return 'country';
    }
    if(iconNumbers.partlyCloudy.indexOf(number) !== -1) {
        return 'dancehall';
    }
    if(iconNumbers.fog.indexOf(number) !== -1) {
        return 'classical';
    }
    if(iconNumbers.lightRain.indexOf(number) !== -1) {
        return 'piano';
    }
    if(iconNumbers.mediumRain.indexOf(number) !== -1) {
        return 'dubstep';
    }
    if(iconNumbers.heavyRain.indexOf(number) !== -1) {
        return 'reggae';
    }
    if(iconNumbers.thunder.indexOf(number) !== -1) {
        return 'metal';
    }
    if(iconNumbers.lightSnow.indexOf(number) !== -1) {
        return 'techno';
    }
    if(iconNumbers.mediumSnow.indexOf(number) !== -1) {
        return 'trance';
    }
    if(iconNumbers.heavySnow.indexOf(number) !== -1) {
        return 'indie';
    }
    if(iconNumbers.snowAndRain.indexOf(number) !== -1) {
        return 'latino';
    }

    return 'world';
}

module.exports = {
    getWeatherMap: getWeatherMap,
    getTypeByNumber: getTypeByNumber,
    getTagsByNumber: getTagsByNumber,
    getGenreByNumber: getGenreByNumber
};

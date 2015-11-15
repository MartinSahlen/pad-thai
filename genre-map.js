var genres = {
    'ALTERNATIVE_ROCK': ['Alternative Rock', 'alternative+rock'],
    'AMBIENT': ['Ambient', 'ambient'],
    'CLASSICAL': ['Classical', 'classical'],
    'COUNTRY': ['Country', 'country'],
    'DANCE_AND_EDM': ['Dance & EDM', 'dance+%26+edm'],
    'DANCEHALL': ['Dancehall', 'dancehall'],
    'DEEP_HOUSE': ['Deep House', 'deep+house'],
    'DISCO': ['Disco', 'disco'],
    'DRUM_AND_BASS': ['Drum & Bass', 'drum+%26+bass'],
    'DUBSTEP': ['Dubstep', 'dubstep'],
    'ELECTRONIC': ['Electronic', 'electronic'],
    'FOLK_AND_SINGER_SONGWRiTER': ['Folk & Singer-Songwriter', 'folk+%26+singer-songwriter'],
    'HIP_HOP_AND_RAP': ['Hip Hop & Rap', 'hip+hop+%26+rap'],
    'HOUSE': ['House', 'house'],
    'INDIE': ['Indie', 'indie'],
    'JAZZ_AND_BLUES': ['Jazz & Blues', 'jazz+%26+blues'],
    'LATIN': ['Latin', 'latin'],
    'METAL': ['Metal', 'metal'],
    'PIANO': ['Piano', 'piano'],
    'POP': ['Pop', 'pop'],
    'R_AND_B_SOUL': ['R&B & Soul', 'r%26b+%26+soul'],
    'REAGGE': ['Reggae', 'reggae'],
    'REAGGAETON': ['Reggaeton', 'reggaeton'],
    'ROCK': ['Rock', 'rock'],
    'SOUNDTRACK': ['Soundtrack', 'soundtrack'],
    'TECHNO': ['Techno', 'techno'],
    'TRANCE': ['Trance', 'trance'],
    'TRAP': ['Trap', 'trap'],
    'TRIP_HOP': ['Trip Hop', 'trip+hop'],
    'WORLD': ['World', 'world']
};

function getGenresMap() {
    return genres;
}

function getGenreByType(type) {
    return genres[type];
}

module.exports = {
    getGenresMap: getGenresMap,
    getGenreByType: getGenreByType
};


export class Game {
    constructor(data) {
        this.bgImg = data.results.background_image
        this.genre = data.genres.name
        this.ratings = data.ratings.reviews_count
        this.name = data.name



    }
}


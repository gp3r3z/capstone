

export class Game {
    constructor(data) {
        this.bgImg = data.background_image
        this.genre = data.genres.name
        this.ratings = data.ratings.reviews_count
        this.name = data.name
        this.id = data.id



    }
}




export class Game {
    constructor(data) {
        this.bgImg = data.background_image
        this.bgImgAdditional = data.background_image_additional
        this.genre = data.genres[0].name
        this.ratings = data.ratings.reviews_count
        this.name = data.name
        this.id = data.id
        this.rating = data.rating
        this.screenshots = data.short_screenshots
        this.stores = data.stores
        this.addedStatus = data.added_by_status
        this.saturated_color = data.saturated_color
        this.description_R = data.description_raw
        this.website = data.website
        this.released = data.released
        this.achievements_count = data.achievements_count
        this.developers = data.developers







    }
}


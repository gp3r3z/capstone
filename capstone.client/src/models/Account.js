export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.coverImg = data.coverImg
    this.platform = data.platform
    this.bio = data.bio
    // TODO add additional properties if needed
  }
}

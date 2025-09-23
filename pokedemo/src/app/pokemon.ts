export class Pokemon {
    id: string
    name: string
    imgUrl: string

    constructor(id: string = '-1', name: string = '', imgUrl: string = '') {
        this.id = id
        this.name = name
        this.imgUrl = imgUrl
    }
}

export interface PokemonStat {
    name: string;
    value: number;
}

export class Pokemon {
    id: string
    name: string
    imgUrl: string
    height?: number
    weight?: number
    stats?: PokemonStat[]
    types?: string[]

    constructor(id: string = '-1', name: string = '', imgUrl: string = '') {
        this.id = id
        this.name = name
        this.imgUrl = imgUrl
    }
}

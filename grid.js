const griglia = 4
const cellSize = 20
const gap = 2

export default class Griglia{
    #celle

    constructor(grigliaElem){
        grigliaElem.style.setProperty('--griglia', griglia)
        grigliaElem.style.setProperty('--cell', `${cellSize}vmin`)
        grigliaElem.style.setProperty('--gap', `${gap}vmin`)
        this.#celle = crea(grigliaElem).map((cellElem, index) => {
            return new Cell(cellElem, index % griglia, Math.floor(index / griglia))
        })
        console.log(this.celle)
    }
}

class Cell{
    #cellElem
    #x
    #y
        constructor(cellElem, x, y){
            this.#cellElem = cellElem
            this.#x = x
            this.#y = y
        }
}

let crea = (grigliaElem) => {
    const celle = []
    for (let i = 0; i < griglia*griglia; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell')
        celle.push(cell)
        grigliaElem.append(cell)
    }
}

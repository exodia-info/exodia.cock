let due = document.querySelector('due')

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container')
    const file = 4
    let cells = []

    let creaCampo = () => {
        for (let i = 0; i < file*file; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            container.appendChild(cell)
            cells.push(cell)
        }
    }
    creaCampo()

    let genera = () => {
        let n = Math.floor(Math.random() * cells.length) 
        if(cells[n].classList == 'cell'){
            (Math.random() <= .7) ? cells[n].classList.add('due') : cells[n].classList.add('quattro')
        }
        else{genera()}
    }

    let numeri = () =>{
    cells.forEach(cell => {
        if(cell.classList == 'cell due'){cell.innerHTML = '2'}
        if(cell.classList == 'cell quattro'){cell.innerHTML = '4'}
    });
    }

    let destra = () => {
        let celleVuote = []
        let cellePiene = []
        let celleDestra = []
        cells.forEach(cell => {
            if(cell.classList == 'cell'){celleVuote.push(cell)}
            else{cellePiene.push(cell)}
        });
        console.log(celleVuote)
        console.log(cellePiene)
        celleDestra = celleVuote.concat(cellePiene)
        console.log(celleDestra)
        celleDestra.forEach(cell => {
            if(cell.classList)
        });
    }

    genera()
    genera()
    numeri()
    destra()
})
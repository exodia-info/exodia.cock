let board= [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
let luminosita = 80
let testo = 20
let score = 0
let Multipli 
let numeri
let won = false
let goal = 2048

window.onload = () => {
    inizializza()
}

let inizializza = () => {
    for(let y = 0; y < 4; y++){
        for(let x = 0; x < 4; x++){
            let cell = document.createElement('div')
            cell.id =`${x.toString()} - ${y.toString()}`
            let num = board[y][x]
            document.getElementById('board').append(cell)
            update(cell, num)
        }
    }
    genera()
    genera()
    boh()
}

let genera = () => {
    let n = Math.floor(Math.random() * 4)
    let m = Math.floor(Math.random() * 4)

    if(!board[n][m]) {
        switch (Multipli) {
            case 3:
                numeri = (Math.random() < .7) ? 3 : 6
                break;
            case 5:
                numeri = (Math.random() < .7) ? 5 : 10
            break;

            default:
                numeri = (Math.random() < .7) ? 2 : 4
                break;
        }
        board[n][m] = numeri
        let cell = document.getElementById(`${m.toString()} - ${n.toString()}`)
        let num = board[n][m]
        update(cell, num)
    }
    else{genera()}
}

let update = (cell, num) => {
        cell.innerText = ''
        cell.classList.value = ''
        cell.classList.add('cell')
        if (num) {
            cell.innerText = num.toString()
            cell.classList.add('tasto')
        }
        tasto = document.querySelectorAll('tasto')
        colore(cell, num)
        document.getElementById('score').innerText = score
}

let colore = (cell, num) => {
    let color
    let n
    if(cell.innerText != null){
        switch (Multipli) {
            case 3:
                color = 81
                n = 3
                uf = 8
                break;
            case 5:
                color = 310
                n = 5
                uf = 7
            break;

            default:
                color = 51
                n = 2
                uf = 9
                break;
        }
        const power = Math.log2(num)
        luminosita = 100 - power * uf
        cell.style.setProperty('--colore', color)
        cell.style.setProperty('--luminosita', `${num ? luminosita : 98}%`)
        cell.style.setProperty('--testo', `${luminosita <= 50 ? 95 : 25}%`)
    } 
}

document.addEventListener('keyup', (e) => {
    if(e.code == 'ArrowLeft' || e.key == 'a') {left(); win()}
    if(e.code == 'ArrowUp' || e.key == 'w') {up(); win()}
    if(e.code == 'ArrowRight' || e.key == 'd') {right(); win()}
    if(e.code == 'ArrowDown' || e.key == 's') {down(); win()}
})

let left = () => {
    for(let y = 0; y < 4; y++){
        let row = board[y]
        row = unisci(row)
        board[y] = row
        for(let x = 0; x < 4; x++){
            let num = board[y][x]
            let cell = document.getElementById(`${x.toString()} - ${y.toString()}`)    
            update(cell, num)
        }
    }

    if(!cekka() && !ckDwn()){haiPersoBro()}
    genera()
}
let right = () => {
    for(let y = 0; y < 4; y++){
        let row = board[y]
        row.reverse()
        row = unisci(row)
        board[y] = row.reverse()
        for(let x = 0; x < 4; x++){
            let num = board[y][x]
            let cell = document.getElementById(`${x.toString()} - ${y.toString()}`)    
            update(cell, num)
        }
    }
    if(!cekka()  && !ckDwn()){haiPersoBro()}
    genera()
}
let up = () => {
    for(let y = 0; y < 4; y++){
        let row = [board[0][y], board[1][y], board[2][y], board[3][y]]
        row = unisci(row)
        for(let x = 0; x < 4; x++){
            board[x][y] = row[x]
            let num = board[x][y]
            let cell = document.getElementById(`${y.toString()} - ${x.toString()}`) 
            update(cell, num)
        }
    }
    if(!cekka() && !ckLft()){haiPersoBro()}
    genera()
}

let down = () => {
    for(let y = 0; y < 4; y++){
        let row = [board[0][y], board[1][y], board[2][y], board[3][y]]
        row.reverse()
        row = unisci(row)
        row.reverse()
        for(let x = 0; x < 4; x++){
            board[x][y] = row[x]
            let num = board[x][y]
            let cell = document.getElementById(`${y.toString()} - ${x.toString()}`) 
            update(cell, num)
        }
    }
    if(!cekka() && !ckLft()){haiPersoBro()}
    genera()
}

let unisci = (row) => {
    row = filtra(row)
    for(let i=0; i < row.length-1; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2
            row[i+1] = 0
            score += row[i]
        } 
    }
    row = filtra(row)
    while(row.length < 4){
        row.push(0)
    }
    return row
}


let filtra = (row) => {
 return row.filter(num => num != 0)
}

let cekka = () => {
    for(let x=0; x<4; x++){
        for(let y=0; y<4; y++){
            if(!board[x][y]) return true
        }
    }
    return false
}

let haiPersoBro = () => {
    document.querySelector('.lost').classList.remove('hide')
}

let ckDwn = () => {
    for(let y = 0; y < 4; y++){
        let row = [board[0][y], board[1][y], board[2][y], board[3][y]]
        row.reverse()
        row = unisci(row)
        row.reverse()
        for(let x=0; x<4; x++){
            console.log(row[x])
            if (row[x] == 0) return true
        }
    }
    return false
}

let ckLft = () => {
    for(let y = 0; y < 4; y++){
        let row = board[y]
        row = unisci(row)
        board[y] = row
        for(let x = 0; x < 4; x++){
            console.log(row[x])
            if (row[x] == 0) return true
        }
    }
    return false
}

let win = () => {
    if(!won){
        for(let x = 0; x < 4; x++){
            for(let y = 0; y < 4; y++){
                if(board[x][y] >= goal) document.querySelector('.win').classList.remove('hide')
            }
        }
        document.querySelector('.continua').addEventListener('click', () => {
            document.querySelector('.win').classList.add('hide')
        })
    }
    won = true
}



let boh = () => {
    let x2 = document.getElementById('x2')
    let x3 = document.getElementById('x3')
    let x5 = document.getElementById('x5')

    x2.addEventListener('click', () => {
        x2.classList.add('alita')
        x3.classList.remove('alita')
        x5.classList.remove('alita')
        Multipli = 2
        goal = 2048
        document.querySelector('h1').innerText = goal
        clear()
    })
    x3.addEventListener('click', () => {
        x2.classList.remove('alita')
        x3.classList.add('alita')
        x5.classList.remove('alita')
        Multipli = 3
        goal = 3072
        document.querySelector('h1').innerText = goal
        clear()
    })
    x5.addEventListener('click', () => {
        x2.classList.remove('alita')
        x3.classList.remove('alita')
        x5.classList.add('alita')
        Multipli = 5
        goal = 5120
        document.querySelector('h1').innerText = goal
        clear()
    })
}

let clear = () => {
    board= [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for(let m = 0; m < 4; m++){
        for(let n = 0; n < 4; n++){
    let cell = document.getElementById(`${m.toString()} - ${n.toString()}`)
    let num = board[n][m]
    update(cell, num)}
    }
    genera()
    genera()
}

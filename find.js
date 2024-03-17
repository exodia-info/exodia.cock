let counter = 0
let tocchi = 0
let modalità = 1

var min = 1;
var max = 90;
var topp = Math.floor((max-min)*Math.random() + min)
var left = Math.floor((max-min)*Math.random() + min)

function classica(){
    modalità = 1

    document.getElementById('classica').classList.add('viola')
    document.getElementById('colori').classList.remove('viola')
    document.getElementById('bw').classList.remove('viola')

    document.getElementById('testo').innerHTML = 'Clicca in giro e ascoltalo miagolare per capire dove si nasconde'
    document.getElementById('body').style.background = `url('sfondo.png') no-repeat center center`
    document.getElementById('body').style.backgroundSize = 'cover'
}

function colori(){
    modalità = 2

    document.getElementById('classica').classList.remove('viola')
    document.getElementById('colori').classList.add('viola')
    document.getElementById('bw').classList.remove('viola')

    document.getElementById('testo').innerHTML = 'In questa modalità più ti avvicinerai più lo sfondo tenderà al verde, più ti allontanerai più tenderà al rosso'
    document.getElementById('body').style.background = 'rgb(138, 192, 93)'
}

function bw(){
    modalità = 3

    document.getElementById('classica').classList.remove('viola')
    document.getElementById('colori').classList.remove('viola')
    document.getElementById('bw').classList.add('viola')

    document.getElementById('testo').innerHTML = 'In questa modalità invece più ti avvicinerai più lo sfondo tenderà al bianco, più ti allontanerai più tenderà al nero'
    document.getElementById('body').style.background = 'rgb(130, 130, 130)'
}

function facile(){
    document.getElementById('facile').classList.add('viola')
    document.getElementById('normale').classList.remove('viola')
    document.getElementById('difficile').classList.remove('viola')
    document.getElementById('esperto').classList.remove('viola')

    exodia.style.height = `160px`
    exodia.style.width = `160px`
    exodia.style.cursor = 'pointer'
}

function normale(){
    document.getElementById('facile').classList.remove('viola')
    document.getElementById('normale').classList.add('viola')
    document.getElementById('difficile').classList.remove('viola')
    document.getElementById('esperto').classList.remove('viola')

    exodia.style.height = `120px`
    exodia.style.width = `120px`
    exodia.style.cursor = 'pointer'
}

function difficile(){
    document.getElementById('facile').classList.remove('viola')
    document.getElementById('normale').classList.remove('viola')
    document.getElementById('difficile').classList.add('viola')
    document.getElementById('esperto').classList.remove('viola')

    exodia.style.height = `80px`
    exodia.style.width = `80px`
    exodia.style.cursor = 'pointer'
}

function esperto(){
    if(counter>=10){
        document.getElementById('facile').classList.remove('viola')
        document.getElementById('normale').classList.remove('viola')
        document.getElementById('difficile').classList.remove('viola')
        document.getElementById('esperto').classList.add('viola')
        exodia.style.cursor = 'default'
    }else{
        window.alert('Devi trovare Exodia per 10 volte prima di sbloccare la modalità Esperto')
    }
}

function start(){
    tocchi = 0
    min = 1;
    max = 90;
    topp = Math.floor((max-min)*Math.random() + min)
    left = Math.floor((max-min)*Math.random() + min)
    let exodia = document.getElementById('exodia')
    let container = document.getElementById('container')
    container.classList.add('hide')
    exodia.classList.add('nascondi')
    exodia.classList.remove('hide')
    exodia.style.top = `${topp}%`
    exodia.style.left = `${left}%`
}

function trovato(){
    counter++

    let miao = new Audio("miao.mp3");
    miao.play();

    let titolo = document.getElementById('titolo')
    let testo = document.getElementById('testo')
    let start = document.getElementById('start')

    if (counter == 1) {prima = true}  else {prima = false}
    if(counter>=10){document.getElementById('esperto').classList.remove('disabled')} else {}

    exodia.classList.remove('nascondi')

    titolo.innerHTML = 'Complimenti!'
    testo.innerHTML = `Hai trovato Exodia ${prima ? 'per la prima volta!' : `per ${counter} volte!`}`
    start.innerHTML = 'Cerca ancora'
    setTimeout("timer()", 2000)
}

function timer(){
    container.classList.remove('hide')
    exodia.classList.add('hide')
}

function click(){
    if(container.classList == 'container hide'){suono()}else{console.log('no')}
}

function suono(){
    if(container.classList == 'container' || exodia.classList != 'exodia nascondi' || modalità != 1){console.log('no')}else{
        var width = window.innerWidth;
        var height = window.innerHeight;
        let X = event.clientX
        let Y = event.clientY
    
        console.log(left + ' left')
        console.log(topp + ' top')
    
        let xPercent = X*100/width
        console.log(`${xPercent.toFixed(0)}%`)
        let yPercent = Y*100/height
        console.log(`${yPercent.toFixed(0)}%`)
    
        let differenzaX = left - xPercent
        let differenzaY = topp - yPercent
        if(differenzaX < 0){differenzaX = differenzaX*-1}
        if(differenzaY < 0){differenzaY = differenzaY*-1}
    
        console.log(`${differenzaX.toFixed(0)} x, ${differenzaY.toFixed(0)} y`)
    
        let audioX = differenzaX/200
        let audioY = differenzaY/200
        let audio = audioX+audioY
        console.log(`${audioX.toFixed(2)} audio x, ${audioY.toFixed(2)} audio y, ${audio.toFixed(2)} audio`)
    
        let volume = 1-audio
        console.log(volume.toFixed(2))
    
        let sound = new Audio("auu.mp3");
        if(tocchi != 0){sound.play()}
        sound.volume = volume

        tocchi++

        if(tocchi%4 == 0){
        if(volume < 0.4){window.alert('decisamente troppo lontano')}
        if(volume < 0.6 && volume >= 0.4){window.alert('troppo lontano')}
        if(volume < 0.7 && volume >= 0.6){window.alert('non ci siamo')}
        if(volume < 0.8 && volume >= 0.7){window.alert('lontano ma non troppo')}
        if(volume < 0.85 && volume >= 0.8){window.alert('Exodia dovrebbe essere da quelle parti')}
        if(volume < 0.9 && volume >= 0.85){window.alert('cerca in questa zona')}
        if(volume < 0.95 && volume >= 0.9){window.alert('ci sei quasi!')}
        if(volume < 1 && volume >= 0.95){window.alert('è qui')}
        }
    }
}

function suono2(){
    if(container.classList == 'container' || exodia.classList != 'exodia nascondi' || modalità != 2){console.log('no')}else{
        var width = window.innerWidth;
        var height = window.innerHeight;
        let X = event.clientX
        let Y = event.clientY
    
        console.log(left + ' left')
        console.log(topp + ' top')
    
        let xPercent = X*100/width
        console.log(`${xPercent.toFixed(0)}%`)
        let yPercent = Y*100/height
        console.log(`${yPercent.toFixed(0)}%`)
    
        let differenzaX = left - xPercent
        let differenzaY = topp - yPercent
        if(differenzaX < 0){differenzaX = differenzaX*-1}
        if(differenzaY < 0){differenzaY = differenzaY*-1}
    
        console.log(`${differenzaX.toFixed(0)} x, ${differenzaY.toFixed(0)} y`)
    
        let audioX = differenzaX/200
        let audioY = differenzaY/200
        let audio = audioX+audioY
        console.log(`${audioX.toFixed(2)} audio x, ${audioY.toFixed(2)} audio y, ${audio.toFixed(2)} audio`)
    
        let volume = 1-audio
        console.log(volume.toFixed(2))
    
        let sound = new Audio("auu.mp3");
        if(tocchi != 0){sound.play()}
        sound.volume = volume

        tocchi++

        if(tocchi != 1){
            let body = document.getElementById('body')

            let x = differenzaX*1.225
            let y = differenzaY*1.225
            let xy = x + y
            let gren = xy*1.55
            let green = 255-gren
            let red = xy
    
            console.log(`rgb(${red.toFixed(0)}, ${green.toFixed(0)}, 0`)
    
            body.style.backgroundColor = `rgb(${red}, ${green}, 0)`
        }
    }
}

function suono3(){
    if(container.classList == 'container' || exodia.classList != 'exodia nascondi' || modalità != 3){console.log('no')}else{
        var width = window.innerWidth;
        var height = window.innerHeight;
        let X = event.clientX
        let Y = event.clientY
    
        console.log(left + ' left')
        console.log(topp + ' top')
    
        let xPercent = X*100/width
        console.log(`${xPercent.toFixed(0)}%`)
        let yPercent = Y*100/height
        console.log(`${yPercent.toFixed(0)}%`)
    
        let differenzaX = left - xPercent
        let differenzaY = topp - yPercent
        if(differenzaX < 0){differenzaX = differenzaX*-1}
        if(differenzaY < 0){differenzaY = differenzaY*-1}
    
        console.log(`${differenzaX.toFixed(0)} x, ${differenzaY.toFixed(0)} y`)
    
        let audioX = differenzaX/200
        let audioY = differenzaY/200
        let audio = audioX+audioY
        console.log(`${audioX.toFixed(2)} audio x, ${audioY.toFixed(2)} audio y, ${audio.toFixed(2)} audio`)
    
        let volume = 1-audio
        console.log(volume.toFixed(2))
    
        let sound = new Audio("auu.mp3");
        if(tocchi != 0){sound.play()}
        sound.volume = volume

        tocchi++

        if(tocchi != 1){
            let body = document.getElementById('body')

            let x = differenzaX*1.225
            let y = differenzaY*1.225
            let xy = x + y
            let red = 255 - xy
            let green = 255 - xy
            let blu = 255 - xy
    
            console.log(`rgb(${red.toFixed(0)}, ${green.toFixed(0)}, ${blu.toFixed(0)}`)
    
            body.style.backgroundColor = `rgb(${red}, ${green}, ${blu})`
        }
    }
}
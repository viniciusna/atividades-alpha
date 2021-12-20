function getById(id) {
    return document.getElementById(id)
}

function getByClass(yourClass) {
    return document.getElementsByClassName(yourClass)
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

function writeInTagByclass(className, index, content) {
    getByClass(className)[index].innerHTML = content
}

let i = 0
let drawnNumbers = []

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function raffle(callback) {
    for (let j = 0; j < 6; j++) {
        writeInTagByclass("container-numbers", j, '')
    }

    interval = window.setInterval(callback, 1000)
    }

function number() {
    let number = getRandom(1, 60)
    let i = 0

    while ( i < drawnNumbers.length ) {
        if ( drawnNumbers[i] == number ) {
            number = getRandom(1, 60)
            i = -1
        }
        i++
    }

    drawnNumbers.push(number)

    writeInTagByclass("container-numbers", i, number)

    if ( i < 5 ) {
        i++
    }

    else {
        clearInterval(interval)
        drawnNumbers = []
        i = 0
    }
}

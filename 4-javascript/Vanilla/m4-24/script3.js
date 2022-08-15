function randomNumber() {
    return Math.floor(Math.random() * 100 + 1)
}

function whoIsGreater() {
    let greater = -Infinity

    for (let i = 0; i < arguments.length; i++) {
        if ( greater < arguments[i] ) {
            greater = arguments[i]
        }
    }

    return greater
}

function raffle() {
    let drawnNumbers = []

    for (let i = 0; i < 10; i++) {
        drawnNumbers.push( randomNumber() )
    }

    console.log(drawnNumbers)

    return whoIsGreater(...drawnNumbers)
}

console.log(raffle())
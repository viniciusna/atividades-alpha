function getById(id) {
    return document.getElementById(id)
}

function getByName(name) {
    return document.getElementsByName(name)
}

function getValueInput(id) {
    return getById(id).value
}

function writeInTag(id, content) {
    getById(id).innerHTML = content
}

let typeOfCars = {
    popular: {
        vmin: {min: 110, max: 130}, 
        vmax: {min: 180, max: 200}, 
        drift: {min: 3, max: 4}
    },
    sport: {
        vmin: {min: 125, max: 145}, 
        vmax: {min: 195, max: 215}, 
        drift: {min: 2, max: 3}
    },
    supersport: {
        vmin: {min: 140, max: 160}, 
        vmax: {min: 210, max: 230}, 
        drift: {min: 1, max: 1.75}
    },
}

let players = [
    {   pedro : { car: {vmin : 0, vmax : 0, drift : 0},
        points : 0,
        level : 0,
        levelUp : false
            }
        },

    {   juca : { car: {vmin : 0, vmax : 0, drift : 0},
        points : 0,
        level : 0,
        levelUp : false
            }
        },

    {   edna : { car: {vmin : 0, vmax : 0, drift : 0},
        points : 0,
        level : 0,
        levelUp : false
            }
        }
]

let pedroRacesWon = 0
let jucaRacesWon = 0
let ednaRacesWon = 0
let pedroPoints = 0
let jucaPoints = 0
let ednaPoints = 0

function whoIsGreater(a,b,c) {
    let aORb = ( (a+b) + Math.abs(b-a) )/2

    return ( (aORb+c) + Math.abs(c-aORb) )/2
}

function getRandom(min, max) {
    return parseFloat( ( ( (Math.random()).toFixed(2) * (max - min)) + min).toFixed(2) )
}

function raffleCar(idToWriteIn, object) {
    let raffle = getRandom(0, 100)
    let car = ''

    if ( raffle <= 60 ) {
        writeInTag(idToWriteIn, "Popular")
        car = typeOfCars.popular
    }

    else if ( raffle <= 95 ) {
        writeInTag(idToWriteIn, "Sport")
        car = typeOfCars.sport
    }

    else {
        writeInTag(idToWriteIn, "Super sport")
        car = typeOfCars.supersport
    }

        object.vmin = parseFloat( getRandom(car.vmin.min, car.vmin.max).toFixed(2) )
        object.vmax = parseFloat( getRandom(car.vmax.min, car.vmax.max).toFixed(2) )
        object.drift = parseFloat( getRandom(car.drift.min, car.drift.max).toFixed(2) )
}

function lapsOptions() {
    for (let i = 0; i < 3; i++) {
        if ( getByName("modality")[i].checked ) {
            writeInTag("laps-number", `${getByName("modality")[i].value}`)
        }
    }
}

function race() {

    writeInTag("laps", '')
    writeInTag("tiebreaker", '')

    raffleCar("type-car-pedro", players[0].pedro.car)
    raffleCar("type-car-juca", players[1].juca.car,)
    raffleCar("type-car-edna", players[2].edna.car,)

    players.forEach(element => {
        if ( Object.entries(element)[0][1].levelUp ) {
            Object.entries(element)[0][1].car.vmin = parseFloat( ( Object.entries(element)[0][1].car.vmin*1.01 ).toFixed(2) )
            Object.entries(element)[0][1].car.vmax = parseFloat( ( Object.entries(element)[0][1].car.vmax*1.01 ).toFixed(2) )
            Object.entries(element)[0][1].levelUp = false
        }
    });

    writeInTag("vmin-pedro", players[0].pedro.car.vmin)
    writeInTag("vmax-pedro", players[0].pedro.car.vmax)
    writeInTag("drift-pedro", players[0].pedro.car.drift)
    writeInTag("vmin-juca", players[1].juca.car.vmin)
    writeInTag("vmax-juca", players[1].juca.car.vmax)
    writeInTag("drift-juca", players[1].juca.car.drift)
    writeInTag("vmin-edna", players[2].edna.car.vmin)
    writeInTag("vmax-edna", players[2].edna.car.vmax)
    writeInTag("drift-edna", players[2].edna.car.drift)

    let lapsNumber = parseInt( getById("laps-number").innerHTML )
    let pedroLapsWon = 0
    let jucaLapsWon = 0
    let ednaLapsWon = 0
    let raceWinner

    for (let i=0; i < lapsNumber; i++) {
        let pedrolap = ( getRandom(players[0].pedro.car.vmin, players[0].pedro.car.vmax)*(1-players[0].pedro.car.drift/100) ).toFixed(2)
        let jucalap = ( getRandom(players[1].juca.car.vmin, players[1].juca.car.vmax)*(1-players[1].juca.car.drift/100) ).toFixed(2)
        let ednalap = ( getRandom(players[2].edna.car.vmin, players[2].edna.car.vmax)*(1-players[2].edna.car.drift/100) ).toFixed(2)

        let greaterSpeed = whoIsGreater(parseFloat(pedrolap), parseFloat(jucalap), parseFloat(ednalap)).toFixed(2)
        let lapWinner

        switch (greaterSpeed) {
            case pedrolap : lapWinner = "Pedro" ; break;
            case jucalap : lapWinner = "Juca" ; break;
            case ednalap : lapWinner = "Edna" ; break;
        }

        getById("laps").innerHTML += `<p> lap ${i+1}: ${lapWinner} </p>`

        switch (lapWinner) {
            case "Pedro" : pedroLapsWon++ ; break;
            case "Juca" : jucaLapsWon++ ; break;
            case "Edna" : ednaLapsWon++ ; break;
        }
    }

    writeInTag("pedro-laps-won", pedroLapsWon)
    writeInTag("juca-laps-won", jucaLapsWon)
    writeInTag("edna-laps-won", ednaLapsWon)

    while ( pedroLapsWon == jucaLapsWon || pedroLapsWon == ednaLapsWon || jucaLapsWon == ednaLapsWon ) {
        let pedrolap = ( getRandom(players[0].pedro.car.vmin, players[0].pedro.car.vmax)*(1-players[0].pedro.car.drift/100) ).toFixed(2)
        let jucalap = ( getRandom(players[1].juca.car.vmin, players[1].juca.car.vmax)*(1-players[1].juca.car.drift/100) ).toFixed(2)
        let ednalap = ( getRandom(players[2].edna.car.vmin, players[2].edna.car.vmax)*(1-players[2].edna.car.drift/100) ).toFixed(2)

        let greaterSpeed = whoIsGreater(parseFloat(pedrolap), parseFloat(jucalap), parseFloat(ednalap)).toFixed(2)
        let lapWinner

        switch (greaterSpeed) {
            case pedrolap : lapWinner = "Pedro" ; break;
            case jucalap : lapWinner = "Juca" ; break;
            case ednalap : lapWinner = "Edna" ; break;
        }

        getById("laps").innerHTML += `<p> Extra lap (desempate): ${lapWinner} </p>`

        switch (lapWinner) {
            case "Pedro" : pedroLapsWon++ ; break;
            case "Juca" : jucaLapsWon++ ; break;
            case "Edna" : ednaLapsWon++ ; break;
        }

        writeInTag("tiebreaker", 
        `Resultado final após o desempate
        <p>Pedro: ${pedroLapsWon} </p>
        <p>Juca: ${jucaLapsWon} </p>
        <p>Edna: ${ednaLapsWon} </p>`)
    }

    let moreLapsWon = whoIsGreater(pedroLapsWon, jucaLapsWon, ednaLapsWon)
    let place1pts = 0
    let place2pts = 0
    let place3pts = 0
    let vice

    switch (lapsNumber) {
        case 10: place1pts = 200, place2pts = 120, place3pts = 50;
            break;

        case 70: place1pts = 220, place2pts = 130, place3pts = 75;
            break;

        case 160: place1pts = 250, place2pts = 150, place3pts = 90;
            break;
    }

    if ( moreLapsWon == pedroLapsWon) {
        raceWinner = "Pedro", pedroRacesWon++, writeInTag("pedro-races-won", pedroRacesWon)
    
        if ( jucaLapsWon > ednaLapsWon ) {
            vice = "Juca"
            pedroPoints += place1pts
            jucaPoints += place2pts
            ednaPoints += place3pts
        }
    
        else {
            vice = "Edna"
            pedroPoints += place1pts
            ednaPoints += place2pts
            jucaPoints += place3pts
        }
    }

    else if ( moreLapsWon == jucaLapsWon) {
        raceWinner = "Juca", jucaRacesWon++, writeInTag("juca-races-won", jucaRacesWon)
    
        if ( pedroLapsWon > ednaLapsWon ) {
            vice = "Pedro"
            jucaPoints += place1pts
            pedroPoints += place2pts
            ednaPoints += place3pts
        }
    
        else {
            vice = "Edna"
            jucaPoints += place1pts
            ednaPoints += place2pts
            pedroPoints += place3pts
        }
    }

    else {
        raceWinner = "Edna", ednaRacesWon++, writeInTag("edna-races-won", ednaRacesWon)
    
        if ( pedroLapsWon > jucaLapsWon ) {
            vice = "Pedro"
            ednaPoints += place1pts
            pedroPoints += place2pts
            jucaPoints += place3pts
        }
    
        else {
            vice = "Juca"
            ednaPoints += place1pts
            jucaPoints += place2pts
            pedroPoints += place3pts
        }
    }

    players[0].pedro.points = pedroPoints
    players[1].juca.points = jucaPoints
    players[2].edna.points = ednaPoints

    players.forEach(element => {
        if ( Object.entries(element)[0][1].points >= 450 && Object.entries(element)[0][1].level < 10 ) {
            Object.entries(element)[0][1].points -= 450
            Object.entries(element)[0][1].level +=1
            Object.entries(element)[0][1].levelUp = true
        }
    });

    pedroPoints = players[0].pedro.points
    jucaPoints = players[1].juca.points
    ednaPoints = players[2].edna.points

    writeInTag("pedro-points", pedroPoints)
    writeInTag("juca-points", jucaPoints)
    writeInTag("edna-points", ednaPoints)

    writeInTag("pedro-level", players[0].pedro.level)
    writeInTag("juca-level", players[1].juca.level)
    writeInTag("edna-level", players[2].edna.level)

    writeInTag("result", `<p> 1° ${raceWinner} </p> 2° ${vice}`)
}

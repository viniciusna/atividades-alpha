function getById(id) {
    return document.getElementById(id)
}

function fontText() {
    let font = 16

    function decreaseFont() {
        font--
        console.log(font)
        getById("article").style.fontSize = font.toString() + "px"
    }

    function increaseFont() {
        font++
        console.log(font)
        getById("article").style.fontSize = font.toString() + "px"
    }

    return {
        decrease : decreaseFont,
        increase : increaseFont
    }
}

let changeFontSize = fontText()

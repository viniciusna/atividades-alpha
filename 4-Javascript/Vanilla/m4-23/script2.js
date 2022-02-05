function showElements(array, i = 0) {
    if ( i === array.length ) {
        return
    }

    if (typeof array[i] !== "object") {
        console.log(array[i])
    }

    else {
        showElements(array[i], 0)
    }

    showElements(array, i+1)
}

showElements( [ [1, ["a", "opa"]], 2, [3, ["b", "c"]] ] )
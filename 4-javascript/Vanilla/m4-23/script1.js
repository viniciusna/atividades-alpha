function fatorial(num, i = num - 1) {
    if ( i === 1) {
        return num
    }

    num *= i
    return fatorial(num, i - 1)
}

console.log(fatorial(5))
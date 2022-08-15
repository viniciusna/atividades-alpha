class ValueValidator {

    public errors: string

    constructor (value: number) {
        this.errors = this.valueIsValid(value)
    }

    private valueIsValid(float: number) {
        return this.countDecimals(float) === 2 && float > 0 ? "" : "Value is invalid|"
    }

    private countDecimals(float: number) {
        try {
            const ns = float.toString().split(".")[1].length
        
            return ns < 3 ? 2 : ns
          } catch {
            return 2
          }
    }
}

export {ValueValidator}
class AccountNumbersValidator {

    public number: string
    public digit: string
    public errors: string

    constructor(accountNumber: string, verifyingDigit: string) {
        this.errors = ""
        this.number = this.validateNumber(accountNumber)
        this.digit = this.validateDigit(verifyingDigit)
    }

    public validateNumber(accnum: string) {

        if (accnum.length != 5) {
            this.errors += "Number account must have 5 numbers|"
        }

        if (!/^\d+$/.test(accnum)) {
            this.errors += "Number account must have only numbers|"
        }

        return accnum
    }

    public validateDigit(dig: string) {
        if (dig.length != 1) {
            this.errors += "Account verifying digit must have 1 number|"
        }

        if (!/^\d+$/.test(dig)) {
            this.errors += "Account verifying digit must have only numbers|"
        }

        return dig
    }
}

export {AccountNumbersValidator}
class PasswordValidator {

    public pw: string
    public errors: string

    constructor(password: string) {
        this.errors = "";
        this.pw = this.validate(password);
    }

    public validate(password: string) {

        if (password.length != 6) {
            this.errors += "Password must be 6 numbers|"
        }

        if (!/^\d+$/.test(password)) {
            this.errors += "Password must have only numbers|"
        }

        return password
    }
}

export {PasswordValidator}
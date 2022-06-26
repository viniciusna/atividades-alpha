class EmailValidator
{
    public email: string;
    public errors: string;
    // eslint-disable-next-line prefer-named-capture-group
    private regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;

    public constructor (email: string)
    {
        this.errors = "";
        this.email = this.validate(email);
    }

    private validate (email: string): string
    {

        if (email.length === 0)
        {
            this.errors += "email:email required|";

            return "";
        }

        if (!this.regex.test(email))
        {
            this.errors += "email:invalid email|";

            return "";
        }

        return email.trim();
    }
}

export { EmailValidator };
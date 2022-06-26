class NameValidator
{
    public errors: string;
    public name: string;

    public constructor (name: string)
    {
        this.errors = "";
        this.name = this.validate(name);
    }

    private validate (name: string): string
    {
        if (!name)
        {
            this.errors += "name:field required|";

            return "";
        }

        if (name.length < 3)
        {
            this.errors += "name:name too short|";

            return "";
        }

        if (!name.trim())
        {
            this.errors += "name:cannot be only space characters|";

            return "";
        }

        return name.trim();
    }
}

export { NameValidator };
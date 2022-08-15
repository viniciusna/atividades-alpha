export class SelectAccount {

    public async getAccountWithPassword(account_number: string, account_verifying_digit: string, password: string, client: any) {
        const text = 'SELECT * FROM accounts WHERE account_number=$1 AND account_verifying_digit=$2 AND password=$3'
        const values = [account_number, account_verifying_digit, password]

        return await client.query(text, values)
    }
}
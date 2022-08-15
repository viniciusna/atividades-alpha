function calculadora() {
    return {
        setOperand1(_operand1){
            this.operand1 = _operand1
        },

        setOperand2(_operand2){
            this.operand2 = _operand2
        },
    
        setOperation(_operation){
            this.operation = _operation
        },

        getResult(){
            let result

            switch (this.operation) {
                case '+': result = this.operand1 + this.operand2;
                    break;

                case '-': result = this.operand1 - this.operand2;
                    break;

                case '*': result = this.operand1 * this.operand2;
                    break;

                case '/': this.operand2 !== 0 ? result = this.operand1 / this.operand2: result = "Não pode dividir por 0";
                    break;
            }

            return result
        },

        clearCalculator() {
            this.operand1 = 0
            this.operand2 = 0
        },
    }
    }

export default calculadora
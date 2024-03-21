function validarCPF(cpf) {
    if (cpf.lenght !== 11) {
        return {valido: false, texto: "CPF deve ter 11 digitos."}
    } else {
        return {valido: true, texto: ""}
    }
}


export {validarCPF};
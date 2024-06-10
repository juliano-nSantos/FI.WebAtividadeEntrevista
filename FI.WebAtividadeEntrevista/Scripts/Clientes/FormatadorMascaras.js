function formatar(mascara, documento) {

    let i = documento.value.length;
    let saida = '#';
    let texto = mascara.substring(i);

    while (texto.substring(0, 1) != saida && texto.length) {
        documento.value += texto.substring(0, 1);
        i++;
        texto = mascara.substring(i);
    }
}

function formatarValor(mascara, value) {

    let length = mascara.length;
    let saida = '#';  
    
    for (var i = 0; i <= length; i++) {
        let texto = mascara.substring(i);
        
        if (texto.substring(0, 1) != saida && texto.length) {
            value = value.replace(value.substring(i), texto.substring(0, 1) + value.substring(i));
            texto = mascara.substring(i);
        }
    }   
    return value;
}
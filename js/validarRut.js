function validaRut(r) {
    var rutCompleto = r
    for (i = 0; i < rutCompleto.length; i++) {
        rutCompleto = rutCompleto.replace('.', '');
        rutCompleto = rutCompleto.replace('-', '-');
    }
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) {
        return false
    } else {
        var tmp = rutCompleto.split('-');
        var digv = tmp[1]
        var rut = tmp[0]
        if (digv == 'K') {
            digv = 'k'
        }

        //return (this.dv(rut) == digv)
        if (this.dv(rut) == digv) {
           return rutCompleto
        }else{
            return false
        }

    }
}
function dv(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}
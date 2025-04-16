export class generadorCodigos{
    static generarCodigo(){
        let numero = "0123456789";

        let valor = "";
        for (let x = 0; x < 6; x++) {
            //genera un numero aleatorio entre 0 y 9
            let aleatorio = Math.floor(Math.random() * numero.length);
            //agrega el numero aleatorio a la variable valor
            valor += numero.charAt(aleatorio);

        }
        return valor;
    }
}
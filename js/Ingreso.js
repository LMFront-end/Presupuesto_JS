class Ingreso extends Dato {
    //atributo estatico

    static contadorIngresos = 0;

    constructor(descripcion, valor) {

        super(descripcion, valor);
        this._idIngresos = ++Ingreso.contadorIngresos;
    }

    get idIngreso() {
        return this._idIngresos;
    }
}
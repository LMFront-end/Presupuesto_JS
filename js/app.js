//Definir los arreglos de ingreso y egreso

const ingresos = [
    new Ingreso('Salario', 1000.00),
    new Ingreso('Venta coche', 1500),
    new Ingreso('Estipendio', 4000),
];

const egresos = [
    new Egreso('Renta departamento', 800),
    new Egreso('Ropa', 200)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

//funcion ingresos

let totalIngresos = () => {
    let totalIngreso = 0;

    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
}

//funcion egresos

let totalEgresos = () => {
    let totalEgreso = 0;

    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }

    return totalEgreso;
}

//Definimos los elementos que vamos a ir sustituyendo.

let cargarCabecero = () => {

    let presupuesto = totalIngresos() - totalEgresos();

    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);

    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);

    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());

    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

}

//interacionalizacion JS

const formatoMoneda = (valor) => {

    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
}

//ingresos y egresos

const cargarIngresos = () => {

    let ingresosHTML = '';

    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {

    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion} </div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle"
                                onclick= 'eliminarIngreso(${ingreso.id})'
                                ></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;

    return ingresoHTML;
}

const eliminarIngreso = (id) => {

    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    //for(let ingreso of ingresos)

    //solo eliminará un elemento
    ingresos.splice(indiceEliminar, 1);

    //una vez eliminado el elemento se recarga el cabecero e ingresos

    cargarCabecero();
    cargarIngresos();

}

const cargarEgresos = () => {

    let egresoHTML = '';

    for (let egreso of egresos) {
        egresoHTML += crearEgresoHTML(egreso);
    }

    document.getElementById('lista-egresos').innerHTML = egresoHTML;
}

const crearEgresoHTML = (egreso) => {

    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion} </div>
    <div class="derecha limparEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)} </div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())} </div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;

    return egresoHTML;
}

const eliminarEgreso = (id) => {

    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    //for(let ingreso of ingresos)

    //solo eliminará un elemento
    egresos.splice(indiceEliminar, 1);

    //una vez eliminado el elemento se recarga el cabecero e ingresos

    cargarCabecero();
    cargarEgresos();
}

//formulario

let agregarDato = () => {

    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {

            ingresos.push(new Ingreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarIngresos();

        } else if (tipo.value === 'egreso') {

            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
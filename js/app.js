//constructor para seguro
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {

    /* 1 = Americano 1.15
       2 = Asiatico 1.05
       3 = Europeo 1.35
    */
    let precioTotal;
    const precioBase = 5000;

    switch (this.marca) {
        case '1':
            precioTotal = precioBase * 1.15;
            break;
        case '2':
            precioTotal = precioBase * 1.05;
            break;
        case '3':
            precioTotal = precioBase * 1.35;
            break;
    }

    //calculo la cantidad de años que tiene el auto
    const diferencia = new Date().getFullYear() - this.anio;
    
    //cada año de diferencia se va a reducir un 3% el precio del seguro
    precioTotal -= ((diferencia * 3) * precioTotal)/100;

    /* si el seguro es basico se multiplica por un 30% mas
       si el seguro es completo por un 50% mas 
     */
    if(this.tipo === 'basico'){
        precioTotal = precioTotal * 1.30;
    } else {
        precioTotal = precioTotal * 1.50;
    }
    
    return precioTotal;
}

// Todo lo que voy a mostrar al usuario
function Interfaz() { }

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function () {
        document.querySelector('.mensaje').remove();
    }, 3000);
}

Interfaz.prototype.mostrarResultado = function (seguro, precio){

    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3': 
            marca = 'Europeo';
            break;
    }

    const div = document.createElement('div');

    div.innerHTML = `
            <p class='header'> Tu Resumen: </p>
            Marca: ${marca} <br>
            Año: ${seguro.anio} <br>
            Tipo: ${seguro.tipo} <br>
            Total: $ ${precio}
            `;
    
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000)
    
}

const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    //Leer la marca seleccionada por el usuario
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //Leer el año seleccionado por el usuario
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // Leer el valor del radion button
    const tipoSeguro = document.querySelector('input[name="tipo"]:checked').value;

    //Crear interface de interfaz
    const interfaz = new Interfaz();

    //Revisando que los campos no estan vacios
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipoSeguro === '') {

        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
    } else {
        const resultados = document.querySelector('#resultado div');

        if(resultados != null){
            resultados.remove();
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipoSeguro);
        const precio = seguro.cotizarSeguro();
        interfaz.mostrarResultado(seguro, precio);
        interfaz.mostrarMensaje('cotizando...','correcto');
    }
})
// Se imprimen las opciones de año del vehiculo, el cual no podra superar los 20 años de antigüedad.
const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');

for (let i = max; i >= min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}

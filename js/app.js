//constructor para seguro
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

// Todo lo que voy a mostrar al usuario
function Interfaz() {}

Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('div');

    if(tipo === 'error') {
         div.classList.add('mensaje','error');
    } else {
         div.classList.add('mensaje','correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 3000);
}

const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e){
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
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipoSeguro === '') {

        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
    } else {

        console.log('Todo correcto para cotizar!');
    }
})
// Se imprimen las opciones de año del vehiculo, el cual no podra superar los 20 años de antigüedad.
const max = new Date().getFullYear(),
      min = max - 20;

const selectAnios = document.getElementById('anio');

for(let i = max; i >= min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option); 
}

// Función para guardar los pacientes en el localStorage
function guardarPacientes(pacientes) {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
}

// Función para obtener los pacientes del localStorage
function obtenerPacientes() {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    return pacientes;
}
// Manejar el envío del formulario
document.getElementById('formularioPaciente').addEventListener('submit', function (event) {
    event.preventDefault(); 


    // Obtener los valores del formulario
    const pacienteNuevo = {
        nombre: document.getElementById('nombrePaciente').value,
        apellido: document.getElementById('apellidoPaciente').value,
        dni: document.getElementById('dniPaciente').value,
        email: document.getElementById('email').value,
        edad: document.getElementById('edadPaciente').value,
        telefono: document.getElementById('telefono').value,
        fechaIngreso: document.getElementById('fechaIngreso').value,
        colegio: document.getElementById('colegio').value,
        consultaDiagnostico: document.getElementById('consultaDiagnostico').value,
        observaciones: document.getElementById('observaciones').value,
    };

    // Obtener los pacientes existentes
    const pacientesActuales = obtenerPacientes();

    // Verificar si el paciente ya existe por DNI
    //si algun elemento (p)que recorre del array da true devuelve el elemento si no da nulo. 
    const pacienteExistente = pacientesActuales.find(p => p.dni === pacienteNuevo.dni);

    if (pacienteExistente) {
        alert('Este DNI ya existe.Por favor, vuelva a ingresar al paciente con otro dni.');

    } else {

        // Agregar el paciente al array
        pacientesActuales.push(pacienteNuevo);

        // Guardar los pacientes en el localStorage
        guardarPacientes(pacientesActuales);
        alert('El paciente se agrego correctamente.');
            // Limpiar el formulario
    document.getElementById('formularioPaciente').reset();
    //muestra los pacientes agregados.
    mostrarPacientes();


    };

});
//Mostrar pacientes
function mostrarPacientes() {
    const pacientes = obtenerPacientes();
    const mostrarP = document.getElementById("pacientesAgregados");
    mostrarP.innerHTML = "<h1> Pacientes Agregados </h1>"; // Limpiar el contenedor antes de mostrar

    pacientes.forEach(({ nombre, apellido, dni, email, edad, telefono, fechaIngreso, colegio, consultaDiagnostico, observaciones }) => {
        const tarjetaPaciente = document.createElement("div");
        tarjetaPaciente.classList.add("tarjetaPaciente");
        tarjetaPaciente.innerHTML = `
      <div class="infoPaciente">
            <p>Nombre: ${nombre} 
            <p>Apellido:${apellido}<p>
            <p>DNI: ${dni}</p>
            <p>Email: ${email}</p>
            <p>Edad: ${edad}</p>
            <p>Teléfono: ${telefono}</p>
            <p>Fecha de Ingreso: ${fechaIngreso}</p>
            <p>Colegio: ${colegio}</p>
            <p>Consulta/Diagnóstico: ${consultaDiagnostico}</p>
            <p>Observaciones: ${observaciones}</p>
               </div>
                           <div class="botonEliminar">

            <button onclick="eliminarPaciente('${dni}')">Eliminar Paciente</button>
              </div>
            <br>
            <hr>
        `;
        mostrarP.appendChild(tarjetaPaciente);
    });
}

function eliminarPaciente(dni) {
    const pacientesActuales = obtenerPacientes();
    const pacientesFiltrados = pacientesActuales.filter(p => p.dni !== dni); // Filtrar el paciente que se desea eliminar
    guardarPacientes(pacientesFiltrados); // Actualizar localStorage
    mostrarPacientes(); // Actualizar la interfaz
}

mostrarPacientes();

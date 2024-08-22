const d = document; // Almacena una referencia al objeto document para facilitar el acceso
const textArea = d.querySelector(".form__input"); // Selecciona el área de texto del formulario
const imageMuneco = d.querySelector(".result__img"); // Selecciona la imagen del muñeco
const resultTitle = d.querySelector(".result__title"); // Selecciona el título de los resultados
const loader = d.querySelector(".loader"); // Selecciona el elemento del loader
const resultText = d.querySelector(".result__text"); // Selecciona el texto de los resultados
const btnEncriptar = d.querySelector(".btn_encriptar"); // Selecciona el botón de encriptar
const btnDesencriptar = d.querySelector(".btn_desencriptar"); // Selecciona el botón de desencriptar
const botonCopiar = d.querySelector(".botonCopiar"); // Selecciona el botón de copiar

// Matriz de llaves para encriptar y desencriptar letras
const llaves = [
    ["e", "enter"], // Encripta "e" como "enter"
    ["i", "imes"],  // Encripta "i" como "imes"
    ["a", "ai"],    // Encripta "a" como "ai"
    ["o", "ober"],  // Encripta "o" como "ober"
    ["u", "ufat"]   // Encripta "u" como "ufat"
];

// Función para encriptar un mensaje
function encriptar(mensaje) {
    let mensajeEncriptado = ""; // Variable para almacenar el mensaje encriptado
    for (let i = 0; i < mensaje.length; i++) { // Recorre cada letra del mensaje
        let letra = mensaje[i]; // Obtiene la letra actual
        let encriptada = letra; // Inicializa la letra encriptada como la original
        for (let j = 0; j < llaves.length; j++) { // Recorre la matriz de llaves
            if (letra === llaves[j][0]) { // Verifica si la letra coincide con alguna llave
                encriptada = llaves[j][1]; // Reemplaza la letra por su valor encriptado
                break; // Termina el bucle interno cuando encuentra la coincidencia
            }
        }
        mensajeEncriptado += encriptada; // Agrega la letra (encriptada o no) al mensaje final
    }
    return mensajeEncriptado; // Devuelve el mensaje encriptado
}

// Función para desencriptar un mensaje
function desencriptar(mensaje) {
    let mensajeDesencriptado = mensaje; // Inicializa el mensaje desencriptado
    for (let i = 0; i < llaves.length; i++) { // Recorre la matriz de llaves
        let regex = new RegExp(llaves[i][1], "g"); // Crea una expresión regular para buscar el valor encriptado
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]); // Reemplaza el valor encriptado por la letra original
    }
    return mensajeDesencriptado; // Devuelve el mensaje desencriptado
}

// Evento que ocurre cuando el usuario escribe en el área de texto
textArea.addEventListener("input", (e) => {
    imageMuneco.style.display = "none"; // Oculta la imagen del muñeco
    resultTitle.textContent = "Capturando Mensaje a encriptar..."; // Cambia el título del resultado
    loader.classList.remove("hidden"); // Muestra el loader
    resultText.textContent = ""; // Limpia el texto del resultado
});

// Evento que ocurre cuando el usuario hace clic en el botón de encriptar
btnEncriptar.addEventListener("click", (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    let mensaje = textArea.value.toLowerCase(); // Convierte el mensaje a minúsculas
    let mensajeEncriptado = encriptar(mensaje); // Encripta el mensaje
    resultText.textContent = mensajeEncriptado; // Muestra el mensaje encriptado en el resultado
    botonCopiar.classList.remove("hidden"); // Muestra el botón de copiar
    resultTitle.textContent = "El mensaje encriptado es:"; // Actualiza el título del resultado
});

// Evento que ocurre cuando el usuario hace clic en el botón de desencriptar
btnDesencriptar.addEventListener("click", (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    let mensaje = textArea.value.toLowerCase(); // Convierte el mensaje a minúsculas
    let mensajeDesencriptado = desencriptar(mensaje); // Desencripta el mensaje
    resultText.textContent = mensajeDesencriptado;
    resultTitle.textContent = "El mensaje encriptado es:";
        imageMuneco.style.display = "block";
        loader.classList.add("hidden"); // Muestra el mensaje desencriptado en el resultado
    botonCopiar.classList.remove("hidden"); // Muestra el botón de copiar
});


botonCopiar.addEventListener("click", ()=>{
    let textoCopiado = resultText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        imageMuneco.style.display = "block";
        loader.classList.add("hidden");
        resultTitle.textContent = "El mensaje se copio:";
        botonCopiar.classList.add("hidden")
        resultText.textContent = "";
    })
});


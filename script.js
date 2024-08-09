var entradaTexto = document.querySelector(".entrada-texto");
var salidaTexto = document.querySelector(".salida-texto");
var seccionTexto1 = document.querySelector(".texto1");
var seccionTexto2 = document.querySelector(".texto2");
var btnCopiar = document.querySelector(".copiar");

function validar(textoValidar) {
    const letras = new Set([
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú"
    ]);

    for (const char of textoValidar) {
        if (letras.has(char)) {
            return false; // Se encontró una letra válida
        }
    }
    return true; // No se encontraron letras válidas
}


function encriptar() {
    var texto = entradaTexto.value;
    var salida = "";
    if(!validar(texto)){
        alert("Texto invalido, verifique su texto.")
        return;
    }
    for(var posicion = 0; posicion < texto.length; posicion++){
        if(texto.charAt(posicion) == "a"){
            salida = salida + "ai";
        }
        else if(texto.charAt(posicion) == "e"){
            salida = salida + "enter";
        }
        else if(texto.charAt(posicion) == "i"){
            salida = salida + "imes";
        }
        else if(texto.charAt(posicion) == "o"){
            salida = salida + "ober";
        }
        else if(texto.charAt(posicion) == "u"){
            salida = salida + "ufat";
        }
        else {
            salida = salida + texto.charAt(posicion);
        }
    }
    entradaTexto.value = "";
    salidaTexto.value = salida;
    ocultar();
}

function desencriptar() {
    const texto = entradaTexto.value;
    if (!validar(texto)) {
        alert("Texto inválido, verifique su texto.");
        return;
    }

    const desencriptacion = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };

    let salida = texto;
    for (const [clave, valor] of Object.entries(desencriptacion)) {
        const regex = new RegExp(clave, 'g');
        salida = salida.replace(regex, valor);
    }

    entradaTexto.value = "";
    salidaTexto.value = salida;
    ocultar();
}


function ocultar(){
    salidaTexto.style.background = "white";
    seccionTexto1.style.display = "none";
    seccionTexto2.style.display = "none";
    btnCopiar.style.display = "";
}

function mostrar(){
    salidaTexto.style.background = "#FFF no-repeat center url(assent/img/notexto.png)";
    seccionTexto1.style.display = "";
    seccionTexto2.style.display = "";
    btnCopiar.style.display = "none";
}

async function copiar() {
    try {
        const copia = salidaTexto.value;
        await navigator.clipboard.writeText(copia);
        mostrarAnuncio("Texto copiado");
    } catch (error) {
        mostrarAnuncio("Error al copiar el texto");
    } finally {
        limpiarSalida();
        mostrar();
    }
}

function mostrarAnuncio(mensaje) {
    const anuncio = document.querySelector(".anuncio");
    anuncio.textContent = mensaje;
    anuncio.style.display = "block";
    setTimeout(() => {
        anuncio.style.display = "none";
    }, 950);
}

function limpiarSalida() {
    salidaTexto.value = "";
}
//creación del diccionario para saber los valores por los que se cambian las letras al encriptar
let diccionario = new Map();
diccionario.set("e", "enter");
diccionario.set("i", "imes");
diccionario.set("a", "ai");
diccionario.set("o", "ober");
diccionario.set("u", "ufat");

//creación de los eventos click de los botones

document.getElementById("encriptar").addEventListener('click', encriptar)
document.getElementById("desencriptar").addEventListener('click', desencriptar)

function encriptar(){
    //obtener el texto y validar que sean minusculas y sin acentos
    let textoOriginal=document.getElementById("entrada").value;
    
    //console.log(textoOriginal)
    let exreg = /^[a-z\s]+$/
    var valido = exreg.test(textoOriginal)
    //console.log(textoOriginal)
    if (!valido) {  
        //configuración del alert   
        iziToast.show({
        title: 'Error',
        message: 'Recuerda que sólo se permiten letras minúsculas y sin acentos',
        backgroundColor:'#be0909e2',
        position:'topRight',
        timeout: 3000,
        progressBar: false,
        closeOnEscape: true,
        closeOnClick: true,
        animateInside: false,
        pauseOnHover: true, 
        theme: 'dark'
        
    });
    }
    else{
        //limpiar el textarea
        document.getElementById("entrada").value=''

        //encriptar el texto recibido y validaddo
        let salida = encriptarTexto(textoOriginal)

        mostrarResultado(salida)
        
    }

   
}
function encriptarTexto(texto){
    //crear un arreglo de cada uno de los caracteres del texto recibido
    let arregloEncriptado = Array.from(texto)

    //recorrer el diccionario para que por cada elemento o letra a cambiar se busque dentro del arregloy haga el intercambio
    for (var [key, value] of diccionario) { 
        arregloEncriptado = arregloEncriptado.map(function(item){
            return item.replace(key, value);
        });
    }

    //con el arreglo ya intercambiado cada uno de los caracteres para encriptar juntarlo de nuevo en un string y devolverlo
    let textoEncriptado = arregloEncriptado.join('');
    //console.log(textoEncriptado);
    return textoEncriptado;

}
function desencriptar(){

    //obtener el texto y validar que sean minusculas y sin acentos
    let textoOriginal=document.getElementById("entrada").value;

    //console.log(textoOriginal)
    let exreg = /^[a-z\s]+$/
    var valido = exreg.test(textoOriginal)
    //console.log(textoOriginal)
    if (!valido) {  
        //configuración del alert   
        iziToast.show({
        title: 'Error',
        message: 'Recuerda que sólo se permiten letras minúsculas y sin acentos',
        backgroundColor:'#be0909e2',
        position:'topRight',
        timeout: 3000,
        progressBar: false,
        closeOnEscape: true,
        closeOnClick: true,
        animateInside: false,
        pauseOnHover: true, 
        theme: 'dark'
        
    });
    }
    else{

         //limpiar el textarea
        document.getElementById("entrada").value=''

        //encriptar el texto recibido y validaddo
        let salida = desencriptarTexto(textoOriginal)

        mostrarResultado(salida)
        
    }



}

function copy() {

    var text = document.getElementById("texto-salida").innerText;
    //console.log(text)
    copyTextToClipboard(text);
    }
    
    async function copyTextToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Texto copiado');
            iziToast.show({
                message: '¡Texto copiado!',
                backgroundColor:'#767678',
                position:'bottomRight',
                timeout: 900,
                progressBar: false,
                closeOnEscape: true,
                closeOnClick: true,
                animateInside: false,
                pauseOnHover: true, 
                theme: 'dark'})
        } catch (err) {
            console.error('Error al copiar el texto ', err);
        }
  }
  
  function desencriptarTexto(texto){
    //recorrer el diccionario y por cada valor remplazarlo por su llave o letra original
    for (var [key, value] of diccionario) { 
        texto = texto.replaceAll(value,key)
    }
    return texto
  }

  function mostrarResultado(salida){

    //crear el nuevo div para almacenar el resultado, crear los elementos para el parrafo y el boton de copiar

    let div2 = document.createElement('div')  
    div2.setAttribute('id','salida-interna')
    let p = document.createElement('p')
    p.setAttribute('id','texto-salida')
    p.textContent = salida
    let botonCopiar = document.createElement('button')
    botonCopiar.setAttribute('id', 'boton-copiar')
    botonCopiar.innerHTML="Copiar"
    
    //cambiar el estilo de los elementos creados
    p.style.fontFamily = 'Inter'
    p.style.fontSize = '16px'
    p.style.color = '#3E0412'
    p.style.height = '75vh'
    p.style.textAlign = 'left'
    div2.style.overflow = "hidden"
    div2.style.paddingTop = "15px"
    botonCopiar.style.backgroundColor = 'white'
    botonCopiar.style.border = '3px solid #FF145B'
    botonCopiar.style.color = '#FF145B'
    botonCopiar.style.fontSize = '14px'
    botonCopiar.style.width = '60%'
    botonCopiar.style.height = '7vh'
    botonCopiar.style.borderRadius = '12px'

    //insertar los elementos p y boton al div 
    div2.appendChild(p)
    div2.appendChild(botonCopiar)
    
    //hacer el intercambio del contenido
    let divSalida = document.getElementById('salida')
    divSalida.replaceChild(div2, document.getElementById('salida-interna'))
    document.getElementById("boton-copiar").addEventListener("click", copy);
    // console.log(textoEncriptado);
  }
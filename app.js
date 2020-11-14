//definicion de las clases 

class Link{
    constructor(tituloEnlace,urlEnlace){
        this.tituloEnlace  = tituloEnlace; 
        this.urlEnlace = urlEnlace; 
    }
} 

class UI{
    static mostrarEnlaces(){
        const enlacesLS = Datos.traerEnlace(); 
        enlacesLS.forEach((enlace) => UI.agregarEnlaceLista(enlace)); 
    } 

    static agregarEnlaceLista(enlace){
        const contenedor = document.querySelector('#misLinks'); 

        const listaLinks = document.createElement('div'); 
        listaLinks.innerHTML = `
            <input type="button" value="${enlace.tituloEnlace}"><a href="#" class="btn-borrar eliminar">X</a> 
        `; 

        contenedor.appendChild(listaLinks); 
    } 

    static eliminarEnlace(elemento){
        if(elemento.classList.contains('eliminar')){
            elemento.parentElement.remove(); 
        }
    } 

    static mostrarAlerta(mensaje, className){
        const parrafo = document.createElement('p'); 
        parrafo.className = `alert alert-${className}`; 
        parrafo.appendChild(document.createTextNode(mensaje)); 

        const container = document.getElementById('form-links'); 
        const formAlert = document.getElementById('muestraAlerta'); 
        container.insertBefore(parrafo,formAlert); 

        setTimeout(()=>document.querySelector('.alert').remove(),3000); 
    } 

    static limpiarCampos(){
        document.querySelector('#titulo-link').value = ''; 
        document.querySelector('#url-link').value = ''; 
    }
} 

class Datos{
    static traerEnlace(){
        let enlacesGuardados; 
        if(localStorage.getItem('enlaces') === null){
            enlacesGuardados = []; 
        }else{
            enlacesGuardados = JSON.parse(localStorage.getItem('enlaces')); 
        }
        return enlacesGuardados;
    } 

    static agregarEnlaceLS(enlace){ 
        const enlaces = Datos.traerEnlace(); 
        enlaces.push(enlace); 
        localStorage.setItem('enlaces',JSON.stringify(enlaces)); 
    }

    static removerEnlace(nombreLink){ 
        const enlaces = Datos.traerEnlace(); 

        enlaces.forEach((enlace,index) => {
            if(enlace.tituloEnlace === nombreLink){
                enlaces.splice(index,1);
            }
        }); 
        localStorage.setItem('enlaces',JSON.stringify(enlaces));
    }
}

//eventos
//evento cuando carga la pagina 

document.addEventListener('DOMContentLoaded',UI.mostrarEnlaces()); 


//dontrolar el evento submit de agregar link
document.querySelector('#form-links').addEventListener('submit',(e)=>{
    e.preventDefault(); 

    //obtener los valores de los campos 

    const tituloEnlace = document.querySelector('#titulo-link').value; 
    const urlEnlace = document.querySelector('#url-link').value;
    
    if(tituloEnlace === '' || urlEnlace === ''){
        UI.mostrarAlerta('Por favor, ingrese todos los datos.','danger'); 
    } else {
        const enlace = new Link(tituloEnlace,urlEnlace); 
        Datos.agregarEnlaceLS(enlace); 
        UI.agregarEnlaceLista(enlace); 
        UI.mostrarAlerta('Enlace agregado con éxito.','echo');
        UI.limpiarCampos();
    }
});

//control evento eliminar link 
document.querySelector('#misLinks').addEventListener('click',(e)=>{
    UI.eliminarEnlace(e.target);
    Datos.removerEnlace(e.target.previousElementSibling.value); 
})

//===================FOTO PERFIL ===================================
class Perfil{
    static cambiarImg(urlImagen){
        document.getElementById('userIMG').src = urlImagen; 
        /* document.getElementById("ig-user").placeholder = userIG; */ 
    }

}


//eventos foto de perfil 

document.getElementById('form-profile').addEventListener('submit',(e)=>{
    e.preventDefault(); 
    const urlImg = document.querySelector('#img-url').value;
    /* const userIG = document.querySelector('#ig-user').value; */ 
    Perfil.cambiarImg(urlImg);
}); 
import HttpCliente from "../servicios/HttpClient";

export const guardarCurso = async (curso,imagen)=>{

    const endpointGuardarCurso = "/cursos";
    const promesaCurso = HttpCliente.post(endpointGuardarCurso,curso);

    if(imagen)
    {
        const endpointGuardarImagen = "/documento";
        const promesaImagen = HttpCliente.post(endpointGuardarImagen,imagen);
        return await Promise.all([promesaCurso,promesaImagen]);
    }
    else{
        return await Promise.all([promesaCurso]);
    }
    
};


export const paginacionCurso = (paginador) =>{

    const endpointPaginador = "/cursos/report";
    
    return new Promise((resolve,eject) =>{
        HttpCliente.post(endpointPaginador,paginador).then(response =>{
            resolve(response);
        })
    })
}
import HttpClient from '../servicios/HttpClient';
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = usuario =>{

    return new Promise((resolve,eject)=>{

        instancia.post('usuario/registrar',usuario).then(response =>{
            resolve(response);
        })
    })
}

export const ObtenerUsuarioActual = (dispatch) => {
    return new Promise((resolve,eject)=>{
        HttpClient.get('usuario').then(response => {

            if(response.data && response.data.imagenPerfil)
            {
                let fotoPerfil = response.data.imagenPerfil;
                const nuevoFile = 'data:image/' + fotoPerfil.extension + ";base64," + fotoPerfil.data;
                response.data.imagenPerfil = nuevoFile;
            }
            dispatch({
                type : "INICIAR_SESION",
                sesion : response.data,
                autenticado : true
            });
            resolve(response);
        })
        .catch((error) =>{
            resolve(error);
        });
    });
};

export const ActualizarUsuario = (usuario,dispatch) =>{
    return new Promise ((resolve,eject) => {
        HttpClient.put('usuario',usuario)
        .then(response =>{
            console.log("marico",response);
            if(response.data && response.data.imagenPerfil)
            {
                let fotoPerfil = response.data.imagenPerfil;
                const nuevoFile = 'data:image/' + fotoPerfil.extension + ";base64," + fotoPerfil.data;
                response.data.imagenPerfil = nuevoFile;
            }
            dispatch({
                type : "INICIAR_SESION",
                sesion : response.data,
                autenticado : true
            });
            resolve(response);
        })
        .catch(error =>{
            console.log("errorActualizar",error);
            resolve(error.response);
        })
    });

};

export const LoginUsuario = (usuario,dispatch) => {
    return new Promise ((resolve,eject)=>{
        instancia.post('usuario/login',usuario).then(response => {

            if(response.data && response.data.imagenPerfil){
                let fotoPerfil = response.data.imagenPerfil;
                const nuevoFile = "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
                response.data.imagenPerfil = nuevoFile;
            }

            dispatch({
                type :"INICIAR_SESION",
                sesion : response.data,
                autenticado : true
            })
            resolve(response);
        }).catch(error =>{
            resolve(error.response);
        });
    });
};

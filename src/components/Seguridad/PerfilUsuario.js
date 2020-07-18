import React, { useState, useEffect } from "react";
import Style from "../Tools/Styles";
import {Container,Typography,Grid,TextField,Button,Avatar} from "@material-ui/core";
import { ObtenerUsuarioActual, ActualizarUsuario,} from "../../actions/UsuarioActions";
import { useStateValue } from "../../contexto/store";
import {v4 as uuidv4} from "uuid";

import reactFoto from '../../logo.svg';

import ImageUploader from 'react-images-upload';
import {obtenerDataImagen} from "../../actions/ImagenActions";

const PerfilUsuario = () => {
  const almacenar = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmarpassword: "",
    username: "",
    imagenPerfil : null,
    fotoUrl :""
  });

  useEffect(() => {
    setUsuario(sesionUsuario.usuario);

    setUsuario(anterior =>({
      ...anterior,
      fotoUrl : sesionUsuario.usuario.imagenPerfil,
      imagenPerfil : null

    }));

  }, []);

  const guardarUsuario = e => {
    e.preventDefault();
    ActualizarUsuario(usuario,dispatch)
      .then((response) => {
        if (response.status === 200) {
            dispatch({
                type : "OPEN_SNACKBAR",
                openMensaje : {
                    open : true,
                    mensaje : "Se guardaron exitosamente los cambios de usuario"
                }

            })

            window.localStorage.setItem("token_seguridad",response.data.token);
        }
        else{
            dispatch({
                type : "OPEN_SNACKBAR",
                openMensaje : {
                    open : true,
                    mensaje : "Fallo al guardar los cambios del usuario " + Object.keys(response.data.errors)
                }

            })

        }       
      })
  };

  const subirFoto = imagenes =>{
    const foto = imagenes[0];
    const fotoUrl = URL.createObjectURL(foto);

    obtenerDataImagen(foto).then(respuesta =>{
      console.log("respuesta",respuesta);
      setUsuario(anterior =>({
        ...anterior,
        ImagenPerfil : respuesta, //respuesta es un json que viene del action obtener imagen
        fotoUrl : fotoUrl // el archivo en formato url
      }));

    })



  };
  const fotoKey = uuidv4();

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={Style.paper}>
        <Avatar style={Style.avatar} src={usuario.fotoUrl || reactFoto} />
        <Typography component="h1" variant="h5">
          Perfil de Usuario
        </Typography>
      
      <form style={Style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              name="nombreCompleto"
              value={usuario.nombreCompleto}
              onChange={almacenar}
              variant="outlined"
              fullWidth
              label="Ingrese Nombre y Apellidos"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              value={usuario.email}
              onChange={almacenar}
              variant="outlined"
              fullWidth
              label="Ingrese Email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="username"
              value={usuario.username}
              onChange={almacenar}
              variant="outlined"
              fullWidth
              label="UserName"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="password"
              type="password"
              value={usuario.password}
              onChange={almacenar}
              variant="outlined"
              fullWidth
              label="Ingrese Contraseña"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="confirmarpassword"
              type="password"
              value={usuario.confirmarpassword}
              onChange={almacenar}
              variant="outlined"
              fullWidth
              label="Confirme Contraseña"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <ImageUploader
            withIcon = {false}
            key = {fotoKey}
            singleImage = {true}
            buttonText = "Seleccione una imagen de perfil"
            onChange = {subirFoto}
            imgExtension = {[".jpg",".png",".git",".jpeg"]}
            maxFileSize = {5242880}          
            />

          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Button
              type="submit"
              onClick={guardarUsuario}
              justify="center"
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              style={Style.submit}
            >
              Guardar Datos
            </Button>
          </Grid>
        </Grid>
      </form>
      </div>
    </Container>
  );
};

export default PerfilUsuario;

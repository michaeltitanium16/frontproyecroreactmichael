import React,{useState} from 'react';
import {Container, Typography, Grid, TextField, Button} from '@material-ui/core';
import style from '../Tools/Styles';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ImageUploader from "react-images-upload";
import {v4 as uuidv4} from "uuid";
import {obtenerDataImagen} from "../../actions/ImagenActions";
import {guardarCurso} from "../../actions/CursoActions";
import {useStateValue} from "../../contexto/store";

const NuevoCurso = () => {

    const [{sesionUsuario},dispatch] = useStateValue();

    const [fechaSeleccionada,setFechaSeleccionada] = useState(new Date());

    const [imagenCurso,setImagenCurso] = useState(null);

    const [curso,setCurso] = useState({
        titulo : "",
        descripcion : "",
        precio : 0.0,
        promocion : 0.0
    });

    const ingresarValoresMemoria = e =>{
        const  {name,value} = e.target;

        setCurso ((anterior)=>({
            ...anterior,
            [name] : value
        }))
    }

    const subirFoto = imagenes =>{
        const foto = imagenes[0];
        obtenerDataImagen(foto).then((respuesta) =>{
            setImagenCurso(respuesta);
        })

    }

    const guardarCursoBoton = e=>{
        e.preventDefault();

        const cursoId = uuidv4();

        const objectoCurso = {
            titulo : curso.titulo,
            descripcion : curso.descripcion,
            promocion : parseFloat(curso.promocion || 0.0),
            precio : parseFloat(curso.precio || 0.0),
            fechaPublicacion : fechaSeleccionada,
            cursoId : cursoId
        };
//se hace esto para asignar el id correspondiente

        let objectoImagen = null;
        
        if(imagenCurso)
        {
            objectoImagen ={
            nombre : imagenCurso.nombre,
            data : imagenCurso.data,
            extension : imagenCurso.extension,
            ObjetoReferencia : cursoId
            };
        };

        guardarCurso(objectoCurso,objectoImagen).then(respuestas =>{

            const responseCurso = respuestas[0];
            const responseImagen = respuestas[1];

            let mensaje = ""

            if(responseCurso.status === 200){
                mensaje += "se guardo exitosamente el curso"
                resetearForm();
            }
            else{
                mensaje += "Errores :" +Object.keys(responseCurso.data.errors);

            }

            if(responseImagen ){
                if(responseImagen.status === 200){
                    mensaje += " , se guardo la imagen correctamente"
                }
                else{
                    mensaje += "Errores :" +Object.keys(responseImagen.data.errors);
  
                }

            }

            dispatch({
                type : "OPEN_SNACKBAR",
                openMensaje : {
                    open : true,
                    mensaje : mensaje
                }
            })

        })
    }

    const resetearForm = ()=>{

        setFechaSeleccionada(new Date());
        setImagenCurso(null);
        setCurso({
            titulo : "",
            descripcion : "",
            precio : 0.0,
            promocion : 0.0
        })

    }

    const fotoKey = uuidv4();
    return (
        <Container component ="main" maxWidth="md" justify ="center">
            <div style={style.paper}>
                <Typography component="h1" variant ="h5">
                    Registo de Nuevo Curso
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                            name="titulo"
                            variant = "outlined"
                            fullWidth
                            label="Ingrese Titulo"
                            onChange = {ingresarValoresMemoria}
                            value = {curso.titulo}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                            name ="descripcion"
                            variant = "outlined"
                            fullWidth
                            label ="Ingrese Descripcion"
                            onChange = {ingresarValoresMemoria}
                            value = {curso.descripcion}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                            name = "precio"
                            variant ="outlined"
                            fullWidth
                            label ="Ingrese Precio normal"
                            onChange = {ingresarValoresMemoria}
                            value = {curso.precio}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                              name ="promocion"
                              variant = "outlined"
                              fullWidth
                              label = "Ingrese Precio Promocion"   
                              onChange = {ingresarValoresMemoria}  
                              value = {curso.promocion}              
                            />
                        </Grid>
                    <Grid item xs={12} md={6}>
                        <MuiPickersUtilsProvider utils ={DateFnsUtils}>
                            <KeyboardDatePicker
                            value ={fechaSeleccionada}
                            onChange = {setFechaSeleccionada}
                            margin ="normal"
                            id="fecha-publicacion-id"
                            label = "Seleccione Fecha de publicacion"
                            format = "dd/MM/yyyy"
                            fullWidth
                            KeyboardButtonProps = {{
                                "aria-label" : "change date"
                            }}
                            />

                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageUploader
                        withIcon = {false}
                        key={fotoKey}
                        singleImage = {true}
                        buttonText = "Seleccion imagen del Curso"
                        onChange = {subirFoto}
                        imgExtension ={[".jpg",".gif",".png",".jpeg"]}
                        maxFileSize = {5242880}
                        />

                    </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} md={5}>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            style = {style.submit}   
                            onClick = {guardarCursoBoton}                       
                            >
                                Guardar Curso
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default NuevoCurso;
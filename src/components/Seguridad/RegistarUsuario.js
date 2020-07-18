import React,{useState} from 'react';
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core';
import Styles from '../Tools/Styles';
import {registrarUsuario} from '../../actions/UsuarioActions';



const RegistarUsuario =()=>{

    const[usuario,setUsuario] = useState({
        nombrecompleto: '',
        email: '',
        password: '',
        confirmacionpassword: '',
        userName: ''
    })

    // e representa el contenido de la caja de texto
    const ingresarValoresMemoria = e => {
        const {name,value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value

        }))
    }

    const registrarBoton = e => {
        e.preventDefault();
        registrarUsuario(usuario).then(response => {
            console.log("Se registro el usuario",response);
            window.localStorage.setItem("token_seguridad",response.data.token);
        });
    }


    return (
        <Container component="main" maxWidth = "md" justify ="center">
            <div style ={Styles.paper}>
                <Typography component="h1" variant="h5">
                    Registro de Usuario
                </Typography>
                <form style = {Styles.form}>
                    <Grid container spacing = {2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="nombrecompleto" value = {usuario.nombrecompleto} onChange={ingresarValoresMemoria} variant ="outlined" fullWidth label="Ingrese su Nombre y Apellidos"/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name ="email"value = {usuario.email} onChange={ingresarValoresMemoria}  variant ="outlined" fullWidth label="Ingrese su email"/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField name ="userName"  value = {usuario.userName} onChange={ingresarValoresMemoria} variant ="outlined" fullWidth label="Ingrese sus UserName"/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField name ="password" value = {usuario.password} onChange={ingresarValoresMemoria}  type="password" variant ="outlined" fullWidth label="Ingrese su contraseña"/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField name ="confirmacionpassword" value = {usuario.confirmacionpassword} onChange={ingresarValoresMemoria}  type="password" variant ="outlined" fullWidth label="Confirme su contraseña"/>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item xs={12} md ={6}>
                            <Button type="submit"  onClick={registrarBoton} fullWidth variant="contained" color="primary" size="large" style={Styles.submit}>
                                Enviar 
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    );
}

export default RegistarUsuario;
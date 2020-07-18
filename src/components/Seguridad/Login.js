import React, { useState } from 'react';
import Styles from '../Tools/Styles';
import { Container, Avatar, Typography, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {LoginUsuario} from '../../actions/UsuarioActions';
import { withRouter } from 'react-router-dom';
import { useStateValue } from '../../contexto/store';

const Login = (props) => {
    const [{usuarioSession},dispatch] = useStateValue();

    const [usuario,setUsuario] = useState({
        email : "",
        password : ""      
    });

    const ingresarValores = e =>{
        const {name,value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]:value
        }))
    }

    const enviarLogin = e =>{
        e.preventDefault();
        LoginUsuario(usuario,dispatch).then(response => {

            if(response.status === 200){
                window.localStorage.setItem("token_seguridad",response.data.token);
                props.history.push("/");
            }
            else{
                dispatch({
                    type : "OPEN_SNACKBAR",
                    openMensaje : {
                        open :true,
                        mensaje : "Las credenciales del usuario son incorrectas"
                    }
                })

            }



        })

    }


    return (
        <Container maxWidth = "xs">
            <div style = {Styles.paper}>
                <Avatar style={Styles.avatar} >
                    <LockOutlinedIcon style={Styles.icon}/>
                </Avatar>
                <Typography component="h1" variant ="h5">
                    Login de Usuario
                </Typography>
                <form style={Styles.form}>
                    <TextField variant ="outlined" label="Ingrese Correo Electronico" value = {usuario.email} onChange = {ingresarValores} name ="email" fullWidth/>
                    <TextField variant ="outlined"  type="password"label="Ingrese contraseña" value = {usuario.password} onChange = {ingresarValores} name ="password" fullWidth margin="normal"/>    

                    <Button type="submit" onClick={enviarLogin} fullWidth variant="contained" color="primary" style={Styles.submit}>
                        Enviar
                    </Button>    
                </form>

            </div>

        </Container>
    );
};

export default withRouter(Login);
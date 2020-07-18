import React, { useState, useEffect } from "react";
import { ThemeProvider as MuithemeProvider } from "@material-ui/core/styles";
import Theme from "./theme/Theme";
import PerfilUsuario from "./components/Seguridad/PerfilUsuario";
import RegistarUsuario from "./components/Seguridad/RegistarUsuario";
import Login from "./components/Seguridad/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, Snackbar } from "@material-ui/core";
import AppNavBar from "./components/navegacion/AppNavBar";
import { useStateValue } from "./contexto/store";

import { ObtenerUsuarioActual } from "./actions/UsuarioActions";
import RutaSegura from "./components/navegacion/RutaSegura";
import NuevoCurso from "./components/Cursos/NuevoCurso";
import PaginadorCurso from "./components/Cursos/PaginadorCurso";

function App() {
  const [{ sesionUsuario , openSnackbar}, dispatch] = useStateValue();

  const [iniciaApp, setIniciaApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      ObtenerUsuarioActual(dispatch).then((response) => {
        setIniciaApp(true);
      });
    }
  }, [iniciaApp]);

  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
            },
          })
        }
      ></Snackbar>
      <BrowserRouter>
        <MuithemeProvider theme={Theme}>
          <AppNavBar />
          <Grid container>
            <Switch>
              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/registrar" component={RegistarUsuario} />

              <RutaSegura 
              exact 
              path ="/auth/perfil"
              component = {PerfilUsuario}            
              />

              <RutaSegura 
              exact
               path ="/"
              component = {PerfilUsuario}            
              />

              <RutaSegura
              exact 
              path = "/curso/nuevo"
              component = {NuevoCurso}         
              />

              <RutaSegura
              exact
              path ="/curso/paginador"
              component = {PaginadorCurso}
              />

            </Switch>
          </Grid>
        </MuithemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

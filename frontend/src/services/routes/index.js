import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Error from "../../pages/Error";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ApiGateway from "../../pages/dashboard";
import Listas from "../../pages/listas";
import AtualizarConsumidores from "../../pages/AtualizarConsumidores";
import ListarServico from "../../pages/ListarServiços";
import AtualizarServicos from "../../pages/AtualizarServicos";
import CadastrarServicos from "../../pages/CadastrarServicos";
import AtualizarIps from "../../pages/AtualizarIps";
import ListarIp from "../../pages/ListaIp";
import CadastrarIp from "../../pages/CadastrarIp";
import VincularIp from "../../pages/VincularIp";



function AppRoute() {
    const [usuario, setUsuario] = useState({});
    const loggedInUser = useSelector(state => state.data);
    const [logado, setLogado] = useState(false);
    const [auth, setAuth] = useState(null);

    const useScript = url => {
        useEffect(() => {
            const script = document.createElement('script');

            script.src = url;
            script.async = true;

            document.body.appendChild(script);
        }, [url]);
    };

    useEffect(() => {
        const auth1 = JSON.parse(localStorage.getItem("user"));
        if (auth1) {
          setAuth(auth1);
        }
      }, []);


    const isAuthenticated = () => {
         let loggedInUser = JSON.parse(localStorage.getItem("user"));
            console.log(loggedInUser)
         if (loggedInUser != null) {
             return true;
         }
         return false;
     };

     const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        console.log("handleLogout");
        window.location="/"
    }
    
     const PrivateRoute = ({component: Component, ...rest}) => {

         return (
             <Route
                 {...rest}
                 render={props =>
                     isAuthenticated() ? (
                        <Component {...props} />
                     ) : (
                         <Redirect to={{pathname: "/", state: {from: props.location}}}/>
                     )
                 }
             />
        );
     }

     return (
        <BrowserRouter>
            <Header isLoggedIn={isAuthenticated()} onLogout={handleLogout} auth={auth}/>
            <div id="content" style={{flex:'1'}}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/lista-consumidores" component={Listas}/>
                    <PrivateRoute path="/cadastro-consumidores" component={ApiGateway}/>
                    <PrivateRoute path="/cadastro-servicos" component={CadastrarServicos}/>
                    <PrivateRoute path='/editar-servico/:id' component={CadastrarServicos}/>
                    <PrivateRoute path="/cadastro-ip" component={CadastrarIp}/>
                    <PrivateRoute path="/vincular-ip/:id" component={VincularIp}/>
                    <PrivateRoute path="/atualizar-consumidores/:id" component={AtualizarConsumidores}/>
                    <PrivateRoute path="/listar-servicos" component={ListarServico}/>
                    <PrivateRoute path="/atualizar-servicos/:id" component={AtualizarServicos}/>
                    <PrivateRoute path="/atualizar-ips/:id" component={AtualizarIps}/>
                    <PrivateRoute path="/listar-ips" component={ListarIp}/>
                    <Route path="*" component={Error} />
                </Switch>
            </div>

            <div className="clearfix"></div>
            <Footer/>
            {useScript('dsgov.js')}
        </BrowserRouter>
    );
}

export default AppRoute;

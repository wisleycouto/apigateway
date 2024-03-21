import React, {useState} from 'react';
import StyledHeader from './style/style';
import LogoOlinda from '../../assets/img/LogoOlinda.png'
import TituloOlinda from '../../assets/img/TituloOlinda.png'
import PopoverComponent from "../popover";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Header = ({isLoggedIn, onLogout, auth}) => {


  return ( <StyledHeader>
  
    <div>       
        <img style={{maxWidth: "150px", maxHeight:"150px", width: "auto", height: "auto", marginBottom:'30px'}} src={LogoOlinda}/>
</div><div>
        <h1 style={{fontSize:'3.5rem', marginRight:'80px', color:'#000'}} >API GATEWAY OLINDA</h1>
    </div>
      
        
      {isLoggedIn && (
        <div style={{boxShadow:"inherit"}}>
          {auth && (
           <PopoverComponent auth={auth}/>
          )}
        </div>
      )}
      {isLoggedIn && (
        <div className="sidebar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/cadastro-consumidores">Cadastrar Consumidor</a>
            </li>
            <li>
              <a href="/lista-consumidores">Listar Consumidores</a>
            </li>
            <li>
              <a href="/cadastro-servicos">Cadastrar Serviço</a>
            </li>
            <li>
              <a href="/listar-servicos">Listar Serviços</a>
            </li>
            <li>
              <a href="/listar-ips">Listar Permissões</a>
            </li>
          </ul>
        </div>
      )}
    </StyledHeader>
  );
};
            
export default Header;
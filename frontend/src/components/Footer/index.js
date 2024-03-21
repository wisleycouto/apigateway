import React, {Component, useEffect, useState} from 'react';
import Divider from '../divider';
//import logoGovBR from '../../assets/img/govbrNegativa.svg';
import acessoInformacao from '../../assets/img/acessoainformacao.svg';
import axios from 'axios';
import StyledFooter from './style/style';


function Footer(props) {
    const systemName = 'API Gateway Olinda';
    const [backendVer, setbackendVer] = useState(undefined);

    useEffect(() => {

        axios.get(process.env.REACT_APP_BASE_URL_BACKEND).then((response) => 
        {
            setbackendVer(response.data);
        }).catch((e) => { 
            console.log("Não foi possível obter dados do servidor...");
            console.log("Erro:", e); 
        });

    }, []);


    const categorias = [
        // { name: 'Teste 1', itens: ['Ut placerat ligula. Praesent. ', 'Aenean facilisis sem , at. ', 'Phasellus non dictum dui. In eleifend. '] },
        // { name: 'Teste 2', itens: ['Duis ut placerat . Praesent. ', 'Aenean facilisis sem ante, at. ', 'Phasellus non dui. Quisque in eleifend. '] },
        // { name: 'Teste 3', itens: ['Duis ut placerat ligula. Praesent. ', 'Aenean sem ante, at. ', 'Phasellus non dictum dui. Quisque in eleifend. '] },
    ];


return (
<>
        
<StyledFooter>

            
            <footer>
                  
                            <span className=''>
                                © Ministério da Educação - Governo Federal
                            </span>
            </footer>
        </StyledFooter>
</>
);
}

export default Footer;

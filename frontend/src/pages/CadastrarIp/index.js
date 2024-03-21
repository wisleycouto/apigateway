import React, {useEffect, useState} from "react";
import {OlindaService} from "../../services/apiOlinda";
import Tabela from "../../GridIpCadastro";
import {useParams} from "react-router-dom";

//COMPONENTS

const CadastrarIp= (props) => {

    const [atualizaTabela,setAtualizaTabela] = useState([]);
    const [isErro, setIsError] = useState(false);
    const [mensagemErro, setMensagemErro] = useState();
    const [data,setData] = useState([]);
    const [consumidor , setConsumidor] = useState();
    let {dados} = false;

    useEffect(() => {
        setIsError(false);

        OlindaService.criarIps()
            .then((response) =>{
                let resposta = response.data;
                let erro = false;
                if(!resposta.erro){
                    setData(resposta.data)
                }else{
                }
            }).catch((err) => {
            setIsError(true);
            let resposta = err.response.data;
            setMensagemErro(resposta.msg)
        });
    },[])



    return (
        <div>
            <div style={{textAlign:"center", marginTop:"20px"}}>
                <h5 style={{fontSize:"30px"}}>Vincular Ip ao Usuário </h5>
            </div>
            <div>
                <Tabela dados ={data} />
            </div>
            <br></br>
        </div>
    )

}

export default CadastrarIp;
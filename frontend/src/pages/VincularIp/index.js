import React, {useEffect, useState} from 'react';
import Input from "../../components/input";
import Button from "../../components/button";
import Loading from "../../components/loading";
import {LdapService} from "../../services/ldap";
import {validaFormInput, validaFormatoSenha} from "../../utils/regex";
import {OlindaService} from "../../services/apiOlinda";
import Select from "react-select/base";
import {useParams} from "react-router-dom";


function VincularIp(props) {


    let { id } = useParams();
    const [isError, setIsError] = useState(false);
    const [isSucess, setIsSucess]= useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [mensagemErro, setMensagemErro] = useState();
    const [inputError, setInputError] = useState("");
    const [mensagemSucess, setMensagemSucess]=useState("");
    const [consumidor, setConsumidor] = useState();
    const [idConsumidor, setIdConsumidore] = useState();
    const [ip, setIp] = useState();
    const [user, setUser] = useState();

    const useScript = url => {
        useEffect(() => {
            const script = document.createElement('script');

            script.src = url;
            script.async = true;

            document.body.appendChild(script);
        }, [url]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);
        setIsSucess(false);
        setShowTable(false);

        OlindaService.criarIps(ip)
            .then((response)=>{
                let resposta = response.data;
                console.log("teste", resposta)
                let erro = false;
                let time = setTimeout(function(){window.location ="/vincular-ip"},5000);
                if(!resposta.erro){
                    setData(resposta.data);
                    setModal(false);
                    setIsSucess(true);
                    setMensagemSucess("Dados Gravados com Sucesso");
                }else{

                }
            })
            .catch((err)=>{
                let resposta = err.response.data;
                setMensagemErro(resposta.msg)
            });
    }

    return (

        <div style={{textAlign:"center",  margin: "20px"}}>

            <form id="formulario" className="gl-show-field-erros" onSubmit={handleSubmit}>

                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>

                    <Input
                        value={ip}
                        id="Ip"
                        placeholder="IP"
                        density="input-highlight"
                        label="IP"
                        change={(e) => {setIp(e.target.value)}}
                    />
                </div>

                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>

                    <Input
                        value={user}
                        id="nomeUsuario"
                        placeholder="Nome do Usuário"
                        density="input-highlight"
                        label="Nome do Usuário"
                        change={(e) => {setUser(e.target.value)}}
                    />
                </div>

                {
                    inputError &&
                    <div style={{width: "30%",textAlign:"center",margin:"0px auto", borderRadius:"6px"}} className=' alert-danger' role="alert" >
                        <h2>Campos obrigatórios!</h2>
                    </div>
                }

                <div style={{marginTop: "20px"}}>
                    <Button
                        backgroundDiv={false}
                        background="primary"
                        titulo="Gravar Dados"
                        typeButton="submit"
                        className="botao"
                        onClick={ (e) => handleSubmit(e)}
                    />
                </div>
            </form>

            {
                isError &&
                <div style={{width:"500px" ,textAlign:"center",margin:"50px auto", borderRadius:"6px"}} className='alert alert-danger' role="alert" >
                    <h2>Ocorreu um erro!</h2>
                    <h1>{mensagemErro}</h1>
                </div>
            }

            <Loading showModal={modal}    />

            { isSucess &&
                <div>
                    <div style={{width:"500px" ,textAlign:"center",margin:"50px auto", borderRadius:"6px"}} className='alert alert-success' role="alert" >
                        <h1>{mensagemSucess}</h1>
                    </div>
                </div>
            }

            {useScript('../dsgov.js')}
        </div>
    )
}

export default VincularIp;
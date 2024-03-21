import React , {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {OlindaService} from "../../services/apiOlinda";
import Tabela from "../../GridConsumidor";
import Input from "../../components/input";
import Button from "../../components/button";
import Loading from "../../components/loading";
import { useParams } from 'react-router-dom';
import {format} from "rsuite/cjs/utils/dateUtils";
import moment from "moment";
import apiOlinda from "../../services/api";

const AtualizarIps = () => {
    let {dados} = false;
    let { id } = useParams();
    const [isError, setIsError] = useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [mensagemErro, setMensagemErro] = useState();
    const [inputError, setInputError] = useState({
        ip: false,
        id_consumidor_ip:false,
        id_consumidor:false
    });

    const [ip, setIp] = useState();
    const [id_consumidor_ip, setId_consumidor_ip] = useState();
    const [id_consumidor, setId_consumidor] = useState();

    const useScript = url => {
        useEffect(() => {
            const script = document.createElement('script');

            script.src = url;
            script.async = true;

            document.body.appendChild(script);
        }, [url]);
    };


    useEffect(() => {
        setIsError(false);

        OlindaService.listarIpPorIps(id)
            .then((response) =>{
                let resposta = response.data;
                let erro = false;
                if(!resposta.erro){
                    setIp(resposta.data.ip);
                    setId_consumidor_ip(resposta.data.id_consumidor_ip);
                    setId_consumidor(resposta.data.id_consumidor)
                }else{
                }
            }).catch((err) => {
            setIsError(true);
            let resposta = err.response.data;
            setMensagemErro(resposta.msg)
        });
    }, 'data')



    const validaInput = (e) => {
        e.preventDefault();
        let errors = inputError;

        if(e.target.value.length <= 0) {
            errors[e.target.id] = true;
            setInputError({
                ip: false,
                id_consumidor_ip:false,
                id_consumidor:false
            })
        }else{
            errors[e.target.id] = false;
        }
        setInputError(errors);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setModal(false);
        setIsError(false);
        setShowTable(false);

        OlindaService.atualizarIps(
            id,
            ip
            )

            .then((response)=>{
                let resposta = response.data;
                let erro = false;
                if(resposta.success){
                    setData(resposta.data)

                }else{
                    console.log("Erro", resposta)
                }
                setModal(false);
            })
            .catch((err)=>{
                setIsError(true);
                let resposta = err.response.data;
                setMensagemErro(resposta.msg)
            });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setModal(false);
        setIsError(false);
        setShowTable(false);

        OlindaService.excluirIps(id)
            .then((response)=>{

            })
            .catch((err)=>{
                setIsError(true);
                let resposta = err.response.data;
                setMensagemErro(resposta.msg)
            });
    }

    const handleInput = (e, value, field) => {
        e.preventDefault();
        field(value);

    }

    return (
        <div style={{textAlign:"center",  margin: "20px"}}>

            <form id="formulario" className="gl-show-field-erros" onSubmit={handleSubmit}>
                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>

                    <Input
                        value={id_consumidor_ip}
                        id="IdConsumidorIp"
                        placeholder="Id do consumidor IP"
                        density="input-highlight"
                        label="Id do consumidor IP"
                        blur={validaInput}
                        customClass={inputError.nomeservico && "alert-danger"}
                        change={(e) => {setId_consumidor_ip(e.target.value)}}
                    />
                </div>

                <br/>


                <div style={{width: "20%", display:"inline-block", padding:"25px"}}>
                    <Input
                        value={ip}
                        id="IpConsumidor"
                        placeholder="IP do Consumidor"
                        density="input-highlight"
                        label="IP do Consumidor"
                        customClass={inputError.servicopublico && "alert-danger"}
                        change={(e) => {setIp(e.target.value)}}
                    />
                </div>
                <div style={{marginTop: "20px", display:"inline-block"}}>
                    <Button
                        backgroundDiv={false}
                        background="success"
                        titulo="Alterar Dados"
                        typeButton="submit"
                        className="botao"
                        onClick={ (e) => handleSubmit(e)}
                    />
                </div>
                <div style={{marginTop: "20px", display:"inline-block"}}>
                    <Button
                        backgroundDiv={false}
                        background="danger"
                        titulo="Excluir Dados"
                        typeButton="submit"
                        className="botao"
                        onClick={ (e) => handleDelete(e)}
                    />
                </div>
            </form>

            <Loading showModal={modal}/>
            {useScript('../dsgov.js')}
        </div>
    )

}

export default AtualizarIps;




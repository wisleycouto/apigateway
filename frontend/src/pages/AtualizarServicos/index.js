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

const AtualizarServicos = () => {
    let {dados} = false;
    let { id } = useParams();
    const [isError, setIsError] = useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [mensagemErro, setMensagemErro] = useState();
    const [inputError, setInputError] = useState({
        urlservico: false,
        nomeservico:false,
        servicopublico:false
    });

    const useScript = url => {
        useEffect(() => {
            const script = document.createElement('script');

            script.src = url;
            script.async = true;

            document.body.appendChild(script);
        }, [url]);
    };

    //constanteAtualizarServicos
    const [nome_servico, setNome_servico] = useState();
    const [url_servico, setUrl_servico] = useState();
    const [servico_publico, setServico_publico] = useState();


    useEffect(() => {
        setIsError(false);
        OlindaService.listarServicosIps(id)
            .then((response) =>{
                let resposta = response.data;
                let erro = false;
                if(!resposta.erro){
                    setNome_servico(resposta.data.nome_servico);
                    setUrl_servico(resposta.data.url_servico);
                    setServico_publico(resposta.data.servico_publico);

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
                urlservico: false,
                nomeservico:false,
                servicopublico:false
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

        OlindaService.atualizarServicos(
            id,
            url_servico,
            nome_servico,
            servico_publico)

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

        OlindaService.excluirServicos(id)
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
                        value={nome_servico}
                        id="urlservico"
                        placeholder="Nome Responsavel"
                        density="input-highlight"
                        label="Nome do Responsável"
                        blur={validaInput}
                        customClass={inputError.nomeservico && "alert-danger"}
                        change={(e) => {setNome_servico(e.target.value)}}
                    />
                </div>

                <br/>

                <div style={{width: "20%", display:"inline-block", padding:"25px"}}>
                    <Input
                        value={url_servico}
                        id="numeroSei"
                        placeholder="Numero do  Sei"
                        density="input-highlight"
                        label="Número do  Sei"
                        blur={validaInput}
                        customClass={inputError.urlservico && "alert-danger"}
                        change={(e) => {setUrl_servico(e.target.value)}}
                    />
                </div>

                <div style={{width: "20%", display:"inline-block", padding:"25px"}}>
                    <Input
                        value={servico_publico}
                        type="date"
                        id="datainicio"
                        placeholder="Data Inicio"
                        density="input-highlight"
                        label="Data do Inicio do Serviço"
                        customClass={inputError.servicopublico && "alert-danger"}
                        change={(e) => {setServico_publico(e.target.value)}}
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

export default AtualizarServicos;




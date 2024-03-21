'use strict';
import React , {useEffect, useState} from "react";
import {OlindaService} from "../../services/apiOlinda";
import Input from "../../components/input";
import Button from "../../components/button";
import Loading from "../../components/loading";
import { useParams } from 'react-router-dom';
import ListaIp from "../ListaIp";
import ListarServicosConsumidor from "../Sevicos/listarServicoConsumidor";

const AtualizarConsumidores = (props) => {
    let { id } = useParams();
    const [isError, setIsError] = useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [mensagemErro, setMensagemErro] = useState();
    const [inputError, setInputError] = useState({
        urlservico: false,
        ipautorizado: false,
        datainicio: false,
        datafim: false,
        contato: false,
        clienteid: false,
        clienteuser: false,
        clientepassword: false,
        consumidor: false,
        telefone: false,
        numeroSei: false,
    });

    // Para validar o formulario
    const [disableSubmit, isSubmitDisabled] = useState(true);

    //constanteAtualizarConsumidores
    const [data_inicio, setData_inicio] = useState();
    const [data_fim, setData_fim] = useState();
    const [num_sei, setNum_sei] = useState();
    const [email_responsavel, setEmail_responsavel] = useState();
    const [nome_responsavel, setNome_responsavel] = useState();
    const [telefone_responsavel, setTelefone_responsavel] = useState();
    const [consumidor, setConsumidor] = useState('');
    const [dataExclusao, setdataExclusao] = useState(null);

    const useScript = url => {
        useEffect(() => {
            const script = document.createElement('script');

            script.src = url;
            script.async = true;

            document.body.appendChild(script);
        }, [url]);
    };


    useEffect(function () {
        setIsError(false);
        setModal(true)
        OlindaService.listarIdConsumidor(id)
            .then((response) =>{
                let resposta = response.data;

                setNome_responsavel(resposta.data.nome_responsavel);
                setTelefone_responsavel(resposta.data.telefone_responsavel);
                setData_inicio(resposta.data.data_inicio);
                setData_fim(resposta.data.data_fim);
                setEmail_responsavel(resposta.data.email_responsavel);
                setNum_sei(resposta.data.num_sei);
                setConsumidor(resposta.data.consumidor);
                setdataExclusao(resposta.data.deleted_at);
                setData(resposta.data)

                setModal(false)
            })
            .catch((err) => {
                setIsError(true);
                let resposta = err.response.data;
                let msg = resposta.msg;

                if(typeof msg === 'object') {
                    msg =  Object.values(msg).map(function(values, index){
                        return <li key={index} style={{textAlign:'left'}}>{values.toString()}</li>
                    });
                }

                setMensagemErro(msg);
                setModal(false);
        });
    }, [])

    useEffect(() => {
        let disableButton = false;
        Object.values(inputError).forEach(attr_error => {
            if(attr_error) {
                disableButton = true;
            }
        })

        isSubmitDisabled(disableButton);
    }, [inputError]);

    const validaInput = event => {
        event.preventDefault();
        let errors = {};

        const attName = event.target.id;
        if (event.target.value <= 0) {
            isSubmitDisabled(true);
            errors = { ...inputError };
            errors[attName] = true;
        } else {
            errors = { ...inputError };
            errors[attName] = false;
        }
        setInputError(errors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);

        OlindaService.atualizarConsumidor(
            id,
            data_inicio,
            data_fim,
            num_sei,
            email_responsavel,
            nome_responsavel,
            telefone_responsavel,
            consumidor
        ).then((response)=>{
                let resposta = response.data;
                setData(resposta.data);
                setModal(false);
        }).catch((err)=>{
                setIsError(true);
                let resposta = err.response.data;
                let msg = resposta.errors;

                if(msg != undefined) {
                    if(typeof msg === 'object') {
                        msg = Object.values(msg).map(function(values, index){
                            return <li key={index} style={{textAlign:'left'}}>{values.toString()}</li>
                        });
                    }
                } else {
                    msg = <li>Erro não reconhecido. Contate o administrador do sistema.</li>
                }

                setMensagemErro(msg)
                setModal(false);
        });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);

        OlindaService.excluirConsumidor(id)
            .then((response)=>{

                console.log(response);
                let resposta = response.data;
                setdataExclusao(resposta.data.deleted_at);
                setModal(false);

            })
            .catch((err)=>{
                setIsError(true);
                let resposta = err.response.data;
                let msg = resposta.errors;

                if(msg != undefined) {
                    if(typeof msg === 'object') {
                        msg = Object.values(msg).map(function(values, index){
                            return <li key={index} style={{textAlign:'left'}}>{values.toString()}</li>
                        });
                    }
                } else {
                    msg = <li>Erro não reconhecido. Contate o administrador do sistema.</li>
                }

                setMensagemErro(msg)
                setModal(false);
            });
    }


    const handleRestore = (e) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);

        OlindaService.restaurarConsumidor(id)
            .then((response)=>{
                let resposta = response.data;
                setdataExclusao(resposta.data.deleted_at);
                setModal(false);
            })
            .catch((err)=>{
                setIsError(true);
                let resposta = err.response.data;
                let msg = resposta.errors;

                if(msg != undefined) {
                    if(typeof msg === 'object') {
                        msg = Object.values(msg).map(function(values, index){
                            return <li key={index} style={{textAlign:'left'}}>{values.toString()}</li>
                        });
                    }
                } else {
                    msg = <li>Erro não reconhecido. Contate o administrador do sistema.</li>
                }

                setMensagemErro(msg)
                setModal(false);
            });
    }

    const handleInput = (e, value, field) => {
        e.preventDefault();
        field(value);
    }

    return (
        <div style={{textAlign:"center", margin: "20px"}}>
            <h3>EDITAR CONSUMIDOR</h3>

            {
                isError &&
                <div style={{width:"500px" ,textAlign:"center",margin:"50px auto", borderRadius:"6px"}} className='alert alert-danger' role="alert" >
                    <h4>Ocorreu um erro!</h4>
                    <div><ul>{mensagemErro}</ul></div>
                </div>
            }
            <Loading showModal={modal}/>

            <form id="formulario" className="gl-show-field-erros" onSubmit={handleSubmit} style={{marginTop:"40px"}}>
                <div style={{width: "80%", display:"inline-block", padding:"25px"}}>
                    <Input
                        value={consumidor}
                        id="consumidor"
                        placeholder="Nome do Consumidor"
                        density="input-highlight"
                        label="Nome do Consumidor *"
                        change={(e) => {validaInput(e); setConsumidor(e.target.value)}}
                        
                    />
                </div>

                <div style={{width: "30%", display:"inline-block", padding:"25px"}}>
                    <Input
                        type="number"
                        value={num_sei}
                        id="numeroSei"
                        placeholder="Numero do  Sei"
                        density="input-highlight"
                        label="Número do  Sei"
                        customClass={inputError.numeroSei && "danger"}
                        change={(e) => {setNum_sei(e.target.value)}}
                    />

                </div>

                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    
                    <Input
                        value={data_inicio}
                        type="date"
                        id="datainicio"
                        placeholder="Data Inicio *"
                        density="input-highlight"
                        label="Data do Inicio do Serviço *"
                        customClass={inputError.datainicio && "danger"}
                        change={(e) => {validaInput(e); setData_inicio(e.target.value)}}
                    />
                    
                </div>

                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    <Input
                        value={data_fim}
                        id="datafim"
                        type="date"
                        placeholder="Data Fim do Serviço"
                        density="input-highlight"
                        label="Data Fim do Serviço *"
                        customClass={inputError.datafim && "danger"}
                        change={(e) => {validaInput(e); setData_fim(e.target.value)}}
                    />
                </div>

                <div style={{width: "30%", display:"inline-block", padding:"25px"}}>
                    <Input
                        value={nome_responsavel}
                        id="urlservico"
                        placeholder="Nome Responsavel"
                        density="input-highlight"
                        label="Nome do Responsável *"
                        customClass={inputError.urlservico && "danger"}
                        change={(e) => {validaInput(e); setNome_responsavel(e.target.value)}}

                    />
                </div>
                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    <Input
                        type="number"
                        value={telefone_responsavel}
                        id="telefone"
                        placeholder="Telefone Responsavel"
                        density="input-highlight"
                        label="Telefone do Responsável *"
                        customClass={inputError.telefone &&  "danger"}
                        change={(e) => {validaInput(e); setTelefone_responsavel(e.target.value)}}

                    />
                </div>

                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    <Input
                
                        value={email_responsavel}
                        id="contato"
                        placeholder="Email do responsavel"
                        density="input-highlight"
                        label="Email do Responsável *"
                        customClass={inputError.contato && "danger"}
                        change={(e) => {validaInput(e); setEmail_responsavel(e.target.value)}}
                    />
                </div>

                <div style={{textAlign:"left", paddingLeft:"200px"}}>
                    <span>* Campos obrigatórios! </span>
                </div>

                <div className="alert alert-warning"  style={{fontSize:'14px', width:"80%", margin:"0px auto", borderRadius:'6px'}}>
                    <h6>Token de acesso:</h6>
                    <span>{data.token_acesso}</span>
                </div>

                <div style={{marginTop: "20px", display:"inline-block", padding:'15px'}}>
                {
                    !dataExclusao &&
                    <Button
                        backgroundDiv={false}
                        variant="success"
                        titulo="Alterar Dados"
                        typeButton="submit"
                        className="botao"
                        onClick={ (e) => handleSubmit(e)}
                        isDisabled={disableSubmit}
                    />
                }
                </div>
                <div style={{marginTop: "20px", display:"inline-block", padding:'15px'}}>
                {
                    !dataExclusao &&
                    <Button
                        variant='danger'
                        backgroundDiv={false}
                        background="danger"
                        titulo="Inativar"
                        typeButton="submit"
                        className="botao"
                        onClick={ (e) => handleDelete(e)}
                    />
                }

                {
                    dataExclusao &&
                    <Button
                    
                    backgroundDiv={false}
                    background="success"
                    titulo="Ativar"
                    typeButton="submit"
                    className="botao"
                    onClick={ (e) => handleRestore(e)}
                    />
                }
                </div>
            </form>
            <div style={{marginTop:"50px"}}>
                <div className="col-md-6" style={{float:'left', display:'inline'}}>
                    <ListaIp id={id} cadastro={true}/>
                </div>
                <div className="col-md-6" style={{float:'right', display:'inline'}}>
                    <ListarServicosConsumidor idConsumidor={id} />
                </div>
               
            </div>
            {useScript('../dsgov.js')}
        </div> 
    )
}

export default AtualizarConsumidores;




import React, {useEffect, useRef, useState} from 'react';
import Input from "../../components/input";
import Button from "../../components/button";
import Loading from "../../components/loading";
import {LdapService} from "../../services/ldap";
import {OlindaService} from "../../services/apiOlinda";
import Select from "react-select/base";
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function CadastrarServicos(props) {
    const [isError, setIsError] = useState(false);
    const [isSucess, setIsSucess]= useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [mensagemErro, setMensagemErro] = useState();
    const [inputError, setInputError] = useState(false);
    const [mensagemSucess, setMensagemSucess]=useState("");
    // Verificando edicao de servico
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    //constanteAtualizarServicos
    const [nome_servico, setNome_servico] = useState('');
    const [servico, setServico] = useState('');
    const [url_servico, setUrl_servico] = useState('');
    const [servico_publico, setServicoPublico] = useState(false);

    // Verificando preenchimento de input
    const listaAtributosObr = [nome_servico, servico, url_servico];
    const [formError, setFormError] = useState({
        nome_servico: false,
        servico: false,
        url_servico: false,
    });

    useEffect(() => {
        if(isEditing) {

            const script = document.createElement('script');
            
            script.src = '../dsgov.js';
            script.async = true;
            
            document.body.appendChild(script);
        }   
    }, [isEditing]);


    useEffect(() => {

        if(id) {
            setIsEditing(true);
            fetchService();
        }
    }, []);


    useEffect(() => {
        let error = false;

        listaAtributosObr.forEach(input => {
            if (input.length <= 0) {
                error = true;
            }
        })

        setButtonDisabled(error);
    }, listaAtributosObr);

    function fetchService() {
        setModal(true);
        setIsError(false);
        setIsSucess(false);
        
        OlindaService.listarIdServico(id)
            .then((response) => {
                const service = response.data;
                const { nome_servico, url_servico, servico_publico, servico } = service.data;
                

                setNome_servico(nome_servico);
                setUrl_servico(url_servico);
                setServicoPublico(servico_publico);
                setServico(servico);

                setModal(false);
            })
            .catch((error) => {
                setIsError(true);
                setMensagemErro(error.response.data.msg);
                setModal(false);
            });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);
        setIsSucess(false);
        setShowTable(false);
        setInputError(false);

        if(isEditing) {

            OlindaService.atualizarServicos(id, nome_servico, url_servico, servico_publico, servico)
                .then((response) => {

                    let resposta = response.data;
                    setTimeout(function(){window.location ="/listar-servicos"}, 1500);

                    if(!resposta.erro) {
                        setMensagemSucess("Dados salvos com sucesso!");
                        setIsSucess(true);
                        setModal(false);
                        setData(resposta.data);
                    }

                })
                .catch((error) => { 

                    let resposta = error.response.data;
                    setIsError(true);
                    setMensagemErro("Não foi possível completar a requisição!");
                    setModal(false);
                });

        } else {
            OlindaService.criarServicos(nome_servico,url_servico,servico_publico, servico)
                .then((response)=>{
                    let resposta = response.data;
                    // console.log("teste", resposta)
                    let erro = false;
                    let time = setTimeout(function(){window.location ="/cadastro-servicos"},5000);
                    if(!resposta.erro){
                        setData(resposta.data);
                        setModal(false);
                        setIsSucess(true);
                        setMensagemSucess("Dados Gravados com Sucesso");
                    }else{
    
                    }
                })
                .catch((err)=>{
                    setIsError(true);
                    let resposta = err.response.data;
                    setMensagemErro(resposta.msg);
                    setModal(false);
                });
        }

    }

    function validarInput(event) {
        event.preventDefault();

        const inputId = event.target.id;
        let formErrorTemp = {};

        if(event.target.value <= 0) {
            formErrorTemp = { ...formError };
            formErrorTemp[inputId] = true;    
        } else {
            formErrorTemp = { ...formError };
            formErrorTemp[inputId] = false;
        }

        setFormError(formErrorTemp);
    }


    return (

        <div style={{textAlign:"center",  margin: "20px",marginTop:'70px'}}>

            <h3 className='text-uppercase text-center '>
                {isEditing? 'Editar' : 'Cadastrar'} Serviço
            </h3>


            <form id="formulario" className="gl-show-field-erros" onSubmit={handleSubmit}>
                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>

                    <Input
                        value={nome_servico}
                        id="nome_servico"
                        placeholder="Nome do Serviço"
                        density="input-highlight"
                        label="Nome do Serviço *"
                        cus
                        change={(e) => {validarInput(e); setNome_servico(e.target.value)}}
                        customClass={formError.nome_servico && 'danger'}
                        
                    />   
                </div>
                    <div style={{width: "25%", display:"inline-block", padding:"25px"}}>

                        <Input
                            value={servico}
                            id="servico"
                            placeholder="Serviço"
                            density="input-highlight"
                            label="Serviço *"
                            change={(e) => {validarInput(e); setServico(e.target.value)}}
                            customClass={formError.servico && 'danger'}
                            />
                    </div>

                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>

                    <Input
                        value={url_servico}
                        id="url_servico"
                        placeholder="Url Do Serviço"
                        density="input-highlight"
                        label="Url Do Serviço *"
                        change={(e) => {validarInput(e); setUrl_servico(e.target.value)}}
                        customClass={formError.url_servico && 'danger'}
                    />
                </div>

                <div className='row text-md-center' style={{paddingLeft: '15%'}}>
                    * Campos obrigatórios!
                </div>

                <div style={{width: "100%", display:"inline-block", padding:"25px"}}>
                    <div className="d-inline-block mr-5">
                        <div className="br-radio">
                            <input
                                id="h-radio-4"
                                type="radio"
                                name="h-radio"
                                value="1"
                                checked={!servico_publico}
                                onClick={e => { setServicoPublico(false) }}
                                />
                            <label htmlFor="h-radio-4">Privado</label>
                        </div>
                    </div>
                    <div className="d-inline-block mr-5">
                        <div className="br-radio">
                            <input
                                id="h-radio-5"
                                type="radio"
                                name="h-radio"
                                value="h-radio-5"
                                checked={servico_publico}
                                onClick={e => { setServicoPublico(true) }}
                            />
                            <label htmlFor="h-radio-5">Público</label>
                        </div>
                    </div>
                </div>


                {
                    inputError &&
                    <div style={{width: "30%",textAlign:"center",margin:"0px auto", borderRadius:"6px"}} className=' alert-danger' role="alert" >
                        <h2>Campos obrigatórios!</h2>
                    </div>
                }

                <div style={{marginTop: "20px"}}>
                    <Button
                        isDisabled={buttonDisabled}
                        backgroundDiv={false}
                        variant="success"
                        titulo="Gravar Dados"
                        typeButton="submit"
                        className="botao"
                        onClick={ (e) => handleSubmit(e)}
                    />
                </div>
            </form>

            {
                isError &&
                <div style={{width:"30%" ,textAlign:"center",margin:"50px auto", borderRadius:"6px"}}>

                    <Alert variant="danger">
                    <Alert.Heading><h4>Ocorreu um erro!</h4>
                    <h5>Não foi possível completar a requisição!</h5></Alert.Heading>
                    </Alert>

                </div>
            }

            <Loading showModal={modal}    />

            { isSucess &&
                <div>
                    <div style={{width:"30%" ,textAlign:"center",margin:"50px auto", borderRadius:"6px"}}>
                        
                    <Alert variant="success">
                    <Alert.Heading><h4>Dados Gravados com Sucesso</h4>
                    </Alert.Heading>
                    </Alert>
                    </div>
                </div>
            }


        </div>
    )
}

export default CadastrarServicos;
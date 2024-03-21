import React, {useEffect, useRef, useState} from 'react';
import Input from "../../components/input";
import Button from "../../components/button";
import Loading from "../../components/loading";
import {LdapService} from "../../services/ldap";
import {validaFormInput, validaFormatoSenha} from "../../utils/regex";
import {OlindaService} from "../../services/apiOlinda";
import {forEach} from "react-bootstrap/ElementChildren";
import Alert from 'react-bootstrap/Alert';

function Dashboard(props) {
    const [isError, setIsError] = useState(false);
    const [isSucess, setIsSucess]= useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [inputError, setInputError] = useState('')
    const [inputValidacaoError, setInputValidacaoError] = useState ()
    const [mensagemSucess, setMensagemSucess]=useState({
        usuario: {error: true, type: 'warning', message: ''},
        password: {error: true, type: 'warning', message: ''},
    });

    //constanteCriarConsumidores
    const [data_inicio, setData_inicio] = useState();
    const [data_fim, setData_fim] = useState();
    const [client_id, setClient_id] = useState();
    const [client_user, setClient_user] = useState();
    const [client_password, setClient_password] = useState();
    const [num_sei, setNum_sei] = useState("");
    const [email_responsavel, setEmail_responsavel] = useState();
    const [nome_responsavel, setNome_responsavel] = useState();
    const [telefone_responsavel, setTelefone_responsavel] = useState();
    const [consumidor, setConsumidor] = useState('');

    // Verificando preenchimento de input
    const [disableSubmit, isSubmitDisabled] = useState(true);
    const dataInicioRef          = useRef();
    const dataFimRef             = useRef();
    const emailRef               = useRef();
    const nomeResponsavelRef     = useRef();
    const consumidorRef          = useRef();
    const telefoneResponsavelRef = useRef();

    const listaAtributosObr = [data_inicio, data_fim, email_responsavel, nome_responsavel, consumidor, telefone_responsavel];
 

    useEffect(() => {
        let disable = false;

        listaAtributosObr.forEach(element => {
            if(!element) {
                disable = true;
            }    
        });
        isSubmitDisabled(disable);
    }, listaAtributosObr);

    function handleInputWarn(event, ref) { 
        if(!event.target.value) {
            ref.current.classList.add(['danger']);
        } else {
            ref.current.classList.remove(['danger']);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);
        setIsSucess(false);
        setShowTable(false);

        OlindaService.criarConsumidor(data_inicio,data_fim, num_sei,email_responsavel,nome_responsavel,telefone_responsavel, consumidor)
            .then((response)=> {
                let resposta = response.data;

                if(!resposta.erro){
                    setData(resposta.data);
                    setModal(false);
                    setIsSucess(true);
                    setMensagemSucess("Dados Gravados com Sucesso");
                    window.location ="/atualizar-consumidores/"+resposta.data.id_consumidor
                }

                setModal(false);
            })
            .catch((err)=>{
                setIsError(true);
                let resposta = err.response.data;
                let msg = resposta.errors;

                if(typeof msg === 'object') {
                    msg = Object.values(msg).map(function(values, index){
                        return <li style={{textAlign:'left'}}>{values.toString()}</li>
                    });
                }

                setMensagemErro("erroo");
                setModal(false);
            });
    }

    return (

        <div style={{textAlign:"center",  margin: "35px"}}>
            {/* <div  style={{ marginTop: '100px'}}/> */}
            <h2>CADASTRO DE CONSUMIDOR</h2>

            {
                isError &&
                <div style={{width:"30%" ,textAlign:"center",margin:"50px auto", borderRadius:"6px"}}>
                                       

                    <Alert variant="danger">
                                <Alert.Heading> <h4>Ocorreu um erro!</h4>
                                
                                <h6>Digite um email válido</h6></Alert.Heading>

                            </Alert>
                </div>
            }

            <Loading showModal={modal}    />
            {
                isSucess &&
                <div style={{width:"20%",textAlign:"center",margin:"50px auto", padding:"0 5px", borderRadius:'6px'}}>

                    <Alert variant="success">
                                <Alert.Heading> <h4>Dados Gravados com Sucesso</h4></Alert.Heading>

                            </Alert>
                </div>
            }

            <form id="formulario" className="gl-show-field-erros" onSubmit={handleSubmit}>
                <div style={{width: "80%", display:"inline-block", padding:"25px"}}>

                    <Input
                        refComponent={consumidorRef}
                        value={consumidor}
                        id="consumidor"
                        placeholder="Nome do Consumidor"
                        density="input-highlight"
                        label="Nome do Consumidor *"
                        change={(e) => {setConsumidor(e.target.value)}}
                        blur={e => handleInputWarn(e, consumidorRef)}
                

                    />
                </div>

                <div style={{width: "30%", display:"inline-block", padding:"25px"}}>
                    <Input
                        value={num_sei}
                        id="numeroSei"
                        type="number"
                        placeholder="Número do Sei"
                        density="input-highlight"
                        label="Número do  Sei"
                        change={(e) => {setNum_sei(e.target.value)}}
                        
                    />
                </div>
                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    <Input
                        refComponent={dataInicioRef}
                        value={data_inicio}
                        type="date"
                        id="datainicio"
                        density="input-highlight"
                        label="Data do Início do Serviço *"
                        change={(e) => {setData_inicio(e.target.value)}}
                        blur={e => handleInputWarn(e, dataInicioRef)}
                    />
                </div>
                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    <Input
                        refComponent={dataFimRef}
                        value={data_fim}
                        type="date"
                        id="datafim"
                        density="input-highlight"
                        label="Data do Fim do Serviço *"
                        change={(e) => setData_fim(e.target.value)}
                        blur={e => handleInputWarn(e, dataFimRef)}
                    />
                </div>

                <div style={{width: "30%", display:"inline-block", padding:"25px"}}>
                   <Input
                        refComponent={nomeResponsavelRef}
                        value={nome_responsavel}
                        id="nomeResponsavel"
                        placeholder="Nome do Responsável"
                        density="input-highlight"
                        label="Nome do Responsável *"
                        change={(e) => {setNome_responsavel(e.target.value)}}
                        blur={e => handleInputWarn(e, nomeResponsavelRef)}
                    />
                </div>

                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    <Input
                        refComponent={telefoneResponsavelRef}
                        value={telefone_responsavel}
                        type="number"
                        id="ipusuario"
                        placeholder="Telefone do Responsável"
                        density="input-highlight"
                        label="Telefone do Responsável *"
                        change={(e) => {setTelefone_responsavel(e.target.value)}}
                        blur={e => handleInputWarn(e, telefoneResponsavelRef)}
                    />
                </div>
                <div style={{width: "25%", display:"inline-block", padding:"25px"}}>
                    <Input
                        refComponent={emailRef}
                        value={email_responsavel}
                        id="contato"
                        placeholder="Email do Responsável"
                        density="input-highlight"
                        label="Email do Responsável *"
                        change={(e) => {setEmail_responsavel(e.target.value)}}
                        blur={e => handleInputWarn(e, emailRef)}
                    />
                </div>

                <div className='row text-md-center' style={{paddingLeft: '13%'}}>
                    * Campos obrigatórios!
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
                        variant="success"
                        titulo="Gravar Dados"
                        typeButton="submit"
                        className="botao"
                        onClick={ (e) => handleSubmit(e)}
                        isDisabled={disableSubmit}
                    />
                </div>
            </form>
        </div>
    )
}

export default Dashboard;
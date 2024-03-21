import React, {useState, useContext, useEffect, useRef, u} from "react";

//COMPONENTES

import Button from "../../components/button";
import Loading from "../../components/loading";

import {LdapService} from "../../services/ldap";
import {validaFormatoSenha} from "../../utils/regex";
import {useSelector} from "react-redux";
import Input from "../../components/input";
//import Checkbox from "../../components/checkbox";
import Message from "../../components/message";
import Form from 'react-bootstrap/Form';

import Alert from 'react-bootstrap/Alert';
import { InputWarning } from "../../components/input/style";
import { set } from "date-fns";

function handleLoginError(error) {

    if (error.response) { // Resposta do servidor
        switch (error.response.status) {

            case 401:
                return "Usuário e/ou senha inválidos!";
            default:
                return "Erro desconhecido, tente novamente!";
        }
    } else if (error.request) { // Sem resposta da API

        return "Sem resposta do servidor, contate o administrador do sistema!";
    }
    
    return "Erro desconhecido, contate o administrador!";
}

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const loggedInUser  = useSelector(state => state.data);
    const [modal, setModal] = useState(false);
    const [result, setResult] = useState("");
    const [password, setPassword] = useState();
    const [mensagemFeedback, setMensagemFeedback] = useState('Informe seu login e senha do MEC.');
    const [tipoMensagemFeedback, setTipoMensagemFeedback] = useState('info');
    const [auth, setAuth] = useState();
    const [showTable, setShowTable] = useState(false);
    const [saveUser, isUsernameSaved] = useState(false);
    const [inputErrorMsg, setInputErrorMsg] = useState({
        usuario: {error: true, type: 'warning', message: ''},
        password: {error: true, type: 'warning', message: ''},
    });
    const [usuarioValid, setUsuarioValid] = useState(true);
    

    useEffect(()=> {
      let loggedInUser = JSON.parse(localStorage.getItem("user"));

       if(loggedInUser != null){
          window.location ='/lista-consumidores'
       } else {
           const savedUsername = localStorage.getItem('savedUsername');
        
           if(savedUsername) {
                isUsernameSaved(true);
                setUsuario(savedUsername);
           }
       }


    }, []);

    useEffect(() => {
        if(saveUser && usuario) {
            localStorage.setItem('savedUsername', usuario);
        } else {
            localStorage.removeItem('savedUsername');
        }

    }, [saveUser, usuario]);

    useEffect(() => {
        validarInputs()

    }, [password, usuario]); 

    function setValidationInput(campo, messageList, type, haveError) {
        
        setInputErrorMsg((error) => ({
            ...error,
            [campo]: {
              ...error[campo],
              type: type || 'warning',
              error: haveError,
              message: messageList,
            },
        }));
    }

    const erroSenha = () => {
        return !validaFormatoSenha.test(password);
    }

    const Enter = (e) => {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
          handleSubmit(e);
        }
      };

    const erroUsuario = () => {
        return !usuario;
    }

     const handleSubmit = (e) => {
        e.preventDefault();
        setModal(true);
        setShowTable(false);

    
        const { usuarioValid, passwordEmpty, passwordIsValid } = validarInputs();


        if (!usuarioValid || passwordEmpty || !passwordIsValid) {
            setModal(false)
          return;
        }

         LdapService.consultarLdap(usuario, password)
             .then((response) => {
                 let resposta = response.data;
                 let erro = false;
                 if (!resposta.erro) {
                     localStorage.setItem('user', JSON.stringify(resposta.result));
                     window.location = "/lista-consumidores";
                 } else {

                 }
                 setModal(false);
             })
             .catch((err) => {                
                setMensagemFeedback(handleLoginError(err));
                setTipoMensagemFeedback('danger');
                setModal(false);
             });
     }

    function validarInputs() {
        let usuarioValid = true;
        let passwordEmpty = false;
        let passwordIsValid = true;

        
        const setErrorMsg = (inputName, errorList, type) => {
            if (inputName === 'usuario') {
                usuarioValid = false;
            } else if (inputName === 'password') {
                passwordIsValid = false;
            }
            setValidationInput(inputName, errorList, type, true);
        }

        if(!usuario) {
            const errorList = ['Campo Obrigatório!', 'danger'];
            setErrorMsg('usuario', ['Usuario não pode ficar vazio'], 'danger');
            usuarioValid = false;
        } else {
            setValidationInput('usuario', [], '', false);
        }

        if (!password) {
            passwordEmpty = true;
            setErrorMsg('password', ['Campo Obrigatório!'], 'danger')
          } else if (!/[A-Z]/.test(password)){
            setErrorMsg('password', ['Senha deve conter pelo menos uma letra maiúscula'], 'danger');
            
            passwordIsValid = false;
            } else {
              setValidationInput('password', [], '', false);
              
            }
        

        return { usuarioValid, passwordEmpty, passwordIsValid };
    }

      let disabledSubmit = false;
        if(modal){
            disabledSubmit = true;
        }


    return (

        <div id="signin-container" className="col-sm-6 col-md-6 col-xl-3"style={{ margin: "auto", textAlign: "center"}}>
                <div className="br-card h-fixed" style={{padding:"10px", margin: "70px auto ", borderRadius: "12px", textAlign: "center", boxShadow: " 0px 0px 30px 15px rgba(210,220,245,1)"}}>

                        <h3 className="text-center" style={{marginBottom: "5px", marginTop: "5px"}}>
                            LOGIN - LDAP
                        </h3>

                    <div className="login-box tab-pane active" tabIndex="0" role="tabpanel">
                        <form id="formulario" className="gl-show-field-erros" onSubmit={handleSubmit}>

                            <Alert variant="info">
                                <Alert.Heading><h6>Informe seu usuário e senha do MEC</h6></Alert.Heading>

                            </Alert>

                            <div className="d-flex flex-column align-items-start" style={{marginTop: "20px"}}>

                                <div className="w-100">

                                <Input
                                    focus={true}
                                    value={usuario}
                                    id="usuario" 
                                    placeholder="Digite o Usuário"
                                    density="input-highlight"
                                    label="Usuário"
                                    mensagem={inputErrorMsg.usuario.message}
                                    change={(e) => {
                                        setUsuario(e.target.value);
                                        if (inputErrorMsg.usuario.error) {
                                        }
                                    }}
                                    customClass={inputErrorMsg.usuario.error ? 'danger' : 'success'}
                                    validacao={inputErrorMsg.usuario.error ? 'danger' : 'success'}
                                /> 
                               
                                </div> 
                                
                                    
                            </div>

                            <div  className="d-flex flex-column align-items-start" style={{marginTop: "20px"}}>

                                <div className="w-100">
                                 <Input
                                    value={password}
                                    type="password" 
                                    placeholder="Digite a Senha"
                                    density="input-highlight"
                                    label="Senha"
                                    id="senha"
                                    mensagem={inputErrorMsg.password.message}
                                    change={(e) => {
                                        setPassword(e.target.value);
                                        if (inputErrorMsg.password.error) {
                                        }
                                    }}
                                    
                                    button={true}
                                    customClass={inputErrorMsg.password.error ? 'danger' : 'success'}
                                    validacao={inputErrorMsg.password.error ? 'danger' : 'success'}

                                />
                              
                                </div>         
                                
                            </div>

                            <div className="text-left pl-1 pt-3">
                            <Form>
                                <Form.Check onChange={e=>(isUsernameSaved(e.target.checked))}
                                checked={saveUser}
                                type="switch"
                                id="save-username"
                                label="Lembrar Usuário" 
                            />
                            </Form>
                              </div>

                            <div>
                            <Button
                            titulo="Login"
                            variant="primary"
                            typeButton="submit"
                            // onClick={ (e) => handleSubmit(e)}
                            Isdisabled={disabledSubmit}></Button> 
                                    
                        
                            </div>
                            
                        </form>
                    </div>

                    <Loading showModal={modal}/>

                </div>
            <br />
        </div>
    );
}

export default Login;


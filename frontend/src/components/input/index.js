import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {InputStyle, InputLogin, PasswordButton, InputLabel} from './style'
import InputMask from 'react-input-mask';

//CSS
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const EyeSlash = <FontAwesomeIcon icon={faEyeSlash} />
const Eye = <FontAwesomeIcon icon={faEye} />

function Input (props) {    
    let type = props.type || "text";
    let id = props.id;
    let label = props.label || "";
    let placeholder = props.placeholder || "";
    let density = props.density || "";
    let button = props.button || false;
    let ico = props.ico ;
    let feedback = props.feedback || "";
    let inputinline = props.inputinline || false;
    let validacao = props.validacao || "";
    let change = props.change || "";
    let blur = props.blur || "";
    let value = props.value || "";
    let customClass = props.customClass || "";

    const [inputtype, setInputtype] = useState(type);

    const mostraSenha =()=> {
        if (inputtype == "password"){
            setInputtype("text")
        }else{
            setInputtype(type)
        }
    }

    return(
      <InputStyle>
        {
            type == 'icone' ?

                <Icone
                    label={label}
                    id={id}
                    change={change}
                    inputinline={inputinline}
                    type="icone"
                    ico={props.ico}
                    placeholder={placeholder}
                    density={density}    
                    blur={blur}
                    value={value}

                /> :
                 <Padrao
                    label={label}
                    id={id}
                    change={change}
                    validacao={validacao}
                    mensagem={props.mensagem}
                    placeholder={placeholder}
                    density={density}
                    inputinline={inputinline}
                    button={button}
                    ico={ico}
                    mask={props.mask}
                    blur={blur}
                    type={inputtype}
                    mostraSenha={mostraSenha}
                    customClass={customClass}
                    value={value}
                    refComponent={props.refComponent}
                    focus={props.focus}
                    
                /> 
        }

        {
            feedback && ""
        }

      </InputStyle>
    );
}

function SwitchCase(props) {
    switch(props.validacao) {
      case 'success':
        return 'Mensagem de Sucesso';
      case 'danger':
        return 'Mensagem de Erro';
      default:
        return 'Mensagem informativa';
    }
  } 
  
function Padrao(props) {
    let message = SwitchCase(props);
   

    
    return(
        <div ref={props.refComponent} className={`br-input  ${props.customClass || ''} ${props.density || ''} ${props.button && 'input-button'} ${props.inputinline && 'input-inline'}`} >
           
                <InputLabel for={props.id}> {props.label}</InputLabel>
           
                <div className="input-content" style={{position:"relative"}}>
                    
                    <InputLogin className={`${props.validacao ? props.validacao : "default"}`}
                    autoFocus={props.focus || false} id={props.id} label={props.label || ""} value={props.value || ''} type={props.type} onChange={props.change} onBlur={props.blur}
                    placeholder={props.placeholder || ''} />
                
                {
                props.button 
                && 
                <PasswordButton type="button" aria-label="Mostrar senha" onClick={props.mostraSenha} >
                    <i className="fas" aria-hidden="true">
                        {props.type =="password" ? EyeSlash : Eye}
                    </i>
                </PasswordButton>        
            }
                <small>{props.mensagem}</small> 

                </div>
         
            

        </div>
    );
}

function Icone(props){
    return(
    <div className={`br-input ${props.density || ''} ${props.inputinline && 'input-inline'}`}>

        <div className="input-label">
            <label for={props.id}>{props.label}</label>
        </div>

            <div className="input-group" >
                    <div className="input-icon">
                        <i className={`fas`}  aria-hidden="true">
                            {props.ico}
                        </i>  
                    </div>
                <input id="input-default" type="text" value={props.value|| ''} placeholder={props.placeholder || ''}/>
            </div>
    </div>
    );
}

export default Input;

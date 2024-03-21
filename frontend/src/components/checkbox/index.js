import React, { useEffect, useRef } from 'react';
import { CheckboxStyle } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const ExclamationImg = <FontAwesomeIcon icon={faExclamationTriangle} />

function Checkbox (props) {
    const alert = props.alerta || false;
    const instructions = props.instrucoes || false;
    const checkboxes = props.data;

    return (   
        <CheckboxStyle>
            {
                instructions ?
                    <CheckboxInstructions {...instructions} />
                :
                    ""
            }
            {
                checkboxes.map((dados, key) => {                  
                    return (
                        <CreateCheckbox {...dados} key={'check-item-'+key} />
                    );
                })               
            }
            {
                alert ? 
                    <CheckboxAlert {...props} />
                :
                 ""
            }
        </CheckboxStyle>
    );
}

function CreateCheckbox (props) {
   const inline = props.inline || false;
      
    return (   
        <>           
            {
                inline ?
                    <div className="d-inline-block mr-5">
                        <CheckboxButton {...props} />
                    </div>
                :
                    <CheckboxButton {...props} />            
            }           
        </>
    );
}

function CheckboxButton (props) {
    const disabled = props.disabled || false;
    const invalid  = props.invalido || false;
    const valid    = props.valido   || false;
    const checked  = props.checked  || false;
    const value    = props.valor    ||    '';
    const text     = props.label    || false;
    const id       = props.id;

    const inputRef = useRef();
    
    useEffect(() => {
        if(props.onCheckChange) {
            inputRef.current.addEventListener('click', e => {
                props.onCheckChange(e.srcElement.checked);
            });
        }

    }, [inputRef.current]);

    
    return (
        <div className={`br-checkbox 
                         ${ disabled ? "disabled" : "" } 
                         ${ invalid ? "invalid" : "" } 
                         ${ valid ? "valid" : "" } 
         `}>
            <input ref={inputRef} id={id} type="checkbox" {...( checked ? { checked: "checked" } : "" )} value={value} />
            <label for={id}>{ text }</label>
        </div>
    );
}

function CheckboxInstructions (props) {
    const title = props.titulo;
    const descripton = props.descricao;

    return (
        <div>
            <p className="label mb-0">
                { title }
            </p>
    
            <p className="help-text">
                { descripton }
            </p>
        </div>
    );
}

function CheckboxAlert(props) {
    const mensagemAlerta = props.alerta || false;

    return (
        <div className="mt-1">
            <span className="feedback warning" role="alert">
                <i className="fas" aria-hidden="true">
                    { ExclamationImg }
                </i>
                { mensagemAlerta }
            </span>
        </div>
    );
}

export default Checkbox;
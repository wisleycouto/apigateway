import React, { Fragment } from 'react';
import {default as Button1} from 'react-bootstrap/Button';

function Button (props) {
    const background = props.backgroundDiv || false;

    return (
        <Fragment>        
            <div className={`${background ? "bg-primary-darken-02 pt-4 pb-4" : ""}`}>
                <GenerateButton 
                    {...props}
                />
            </div>
        </Fragment>
    );
}

function GenerateButton (props) {
    const active = props.ativo || false; // true | false    
    const inverted = props.inverted || false; // true | false    
    const isLoading = props.loading || false; // true | false    
    const isBlock = props.tipoBlock || false; // true | false     
    const typeButton = props.typeButton || "button";    
    const background = props.background;
    const isDisabled = props.isDisabled || false;
    const image = props.image || false;
    const onClick = props.onClick || "";
    

    return (

        <Button1 variant={props.variant} name={props.titulo} type={typeButton} onClick={props.onClick} disabled={props.isDisabled} active={props.ativo}
         onLoad={props.Loading} block={props.tipoBlock}
        >
            {
                props.ico ?
                    <i className={`fas ${props.titulo ? "mr-1" : ""} `} aria-hidden="true"> {props.ico} </i>
                :
                    ""
            }

            {
                props.titulo ?
                    props.titulo
                :
                    ""
            }

            {
                image ?
                    <span style={{marginLeft:"5px"}}>
                        <img src={image} alt="logo"/>
                    </span>     
                :
                    ""
            }
        </Button1>
    );   
}

export default Button; 
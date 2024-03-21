import React, { useEffect, useState } from "react";

//COMPONENTS
import Input from "../../components/input";
import Button from "../../components/button";

import { Popover, Whisper } from "rsuite";
import AvatarComponent from "../../components/avatar";
import { faHome, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css'



const HomeImg = <FontAwesomeIcon icon={faHome} />
const SignIn = <FontAwesomeIcon icon={faSignInAlt} />

const PopoverComponet = (props) => {


    let auth = props.auth;
    let siglaNome = auth.usuario

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        console.log("handleLogout");
        window.location = "/"
    }


    return (

        <div>
            <Whisper trigger="click"

                placement='bottom'

                style={{ alignItems: "center", }}

                speaker={

                    <Popover style={{ position: 'absolute', right: 10, width: '400px', zIndex: 9999, textAlign: 'center', backfaceVisibility:"hidden" }}>

                        <h6 style={{ padding: "10px" }}>{auth.nome}</h6>
                        <p>{auth.email}</p>
                        <p >{auth.titulo}</p>
                        <p >{auth.cpf}</p>

                        <br />

                        <Button style={{borderRadius:"50px"}}
                            variant="danger"
                            backgroundDiv={false}
                            background="secondary"
                            titulo="Log Out"
                            ico={SignIn}
                            typeButton="submit"
                            className="botao"
                            onClick={(e) => handleLogout(e)}

                        />
                    </Popover>
                }
            >
            
                    <button className="br-sign-in primary circle mt-3 mt-sm-0 ml-sm-3" type="button" style={{margin:"0px", padding:"0px", background:"black", borderRadius:"50%", width:"45px", height:"45px"}}
                        aria-label="icone ilustrativo"><FontAwesomeIcon icon={faSignOutAlt} style={{color:"white", backgroundColor: "#000000", fontSize:"25px" }} aria-hidden="true"/>
                    </button>
                    
                
            </Whisper>

        </div>
    )
}

export default PopoverComponet;





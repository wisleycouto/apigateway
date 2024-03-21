import React, {useEffect} from "react";
//COMPONENTS
import Button from "../../components/button";
import LogoApiGateway from "../../assets/LogoApiGateway.svg";

const Home = () => {

    useEffect(()=> {
        let loggedInUser = JSON.parse(localStorage.getItem("user"));

        if(loggedInUser != null){ 
            window.location ='/lista-consumidores'
        }
    }, [])
    
     return (
        <div style={{textAlign:"center", marginTop: "50px", marginBottom: "60px"}}>
                <img src={LogoApiGateway} alt="logo" style={{width:"6%"}}/> 

            <div style={{ padding:"20px"}}>
                <h4 className="text-center">
                    Api Gateway Olinda <br/> 
                    <span style={{fontSize:"17px"}}>Gateway de autenticação no Olinda</span>
                </h4>
            </div>
                    
             <p  style={{margin:"1px auto", width:"80%", textAlign:"justify", fontSize:"23px", padding:"30px"}}>
                O API Gateway Olinda é um serviço da STIC para criação, publicação, manutenção, monitoramento e proteção de APIs REST que autentica o Olinda, com isso, o MEC passa ter autenticação e autorização nos serviços que o Olinda dispoe.
            </p>
    

                <div style={{display: "inline-block"}}>
                    <a href="/login">
                    <Button variant="primary"
                        titulo="Entrar com LDAP"/> 
                        
                    </a>
                </div>

            <div style={{alignItems:"center", marginTop: "20px", marginBottom: "20px"}}>
                <a href="*" style={{textDecoration: "underline", fontSize:"20px"}}>Está com dúvidas?</a>
            </div>            
        </div>
    )

}

export default Home;





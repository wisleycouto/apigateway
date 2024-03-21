import React, {useEffect} from "react";
import {Card, Button, Dropdown} from "react-bootstrap";
import LogoApiGateway from "../../assets/LogoApiGateway.svg";



function Apresentacao (){


    useEffect(()=> {
        let loggedInUser = JSON.parse(localStorage.getItem("user"));

        if(loggedInUser == null){
            window.location ='/login'
        }
    }, [])

    return (
        <div style={{textAlign:"center", marginTop: "50px", marginBottom: "60px"}}>
            <img src={LogoApiGateway} alt="logo" style={{width:"5%", marginBottom:"10px"}}/>
            <Card>
                <Card.Header as="h5">API GATEWAYOLINDA</Card.Header>
                <Card.Body>
                    <Card.Title>Apigatewayolinda é uma solução desenvolvida pela CGS/STIC para centralizar
                        autenticação ao OLINDA para consumidores externos ao MEC.</Card.Title>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Menu
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/apigateway">Cadastrar Clientes</Dropdown.Item>
                            <Dropdown.Item href="/listas">Listar Clientes</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Cadastrar Serviços</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Listar Serviços</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>
        </div>
    )
}


export default Apresentacao;
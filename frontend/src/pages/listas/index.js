import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {OlindaService} from "../../services/apiOlinda";
import Tabela from "../../GridConsumidor";
import Button from "../../components/button";
import Loading from "../../components/loading";

//COMPONENTS

const Listas = () => {
    const [data, setData] = useState([]);
    const [menssagemErro, setMensagemErro] = useState();
    const [modal, setModal] = useState(false);


useEffect(() => {
        setModal(true)

        OlindaService.listarconsumidor()
            .then((response) => {
                let resposta = response.data;

                setData(resposta.data)
                setModal(false)
            }).catch((err) => {
                let resposta = err.response.data;
                setModal(false)
                setMensagemErro(resposta.msg)
        });
    }, [])

    return (
        
        <div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
                <h5 style={{fontSize: "40px"}}>Lista de Consumidores</h5>
            </div>
            <Loading showModal={modal}/>
            <div style={{marginTop: "80px", textAlign: "right", marginRight: "200px"}}>

                    
                <Button
                    backgroundDiv={false}
                    variant="primary"
                    ativo={false}
                    inverted={true}
                    loading={false}
                    titulo="Novo Cadastro"
                    tipoBlock={false}
                    disabled={false}
                    onClick={(e) => {
                        e.preventDefault();
                        window.location = "/cadastro-consumidores";
                    }}
                />
            </div>
            <div>
                <Tabela dados={data}/>
            </div>
            
        </div>
    )

}

export default Listas;
import React, {useEffect, useState} from "react";
import {OlindaService} from "../../services/apiOlinda";
import Tabela from "../../GridIp";
import Button from "../../components/button";
import Input from "../../components/input";
import TabelaServicos from "../../GridServico";
import ListarServico from "../ListarServiços";
import Loading from "../../components/loading";
// import {Combobox} from "react-widgets/cjs";

//COMPONENTS

const ListarIp = (props) => {

    const [atualizaTabela,setAtualizaTabela] =useState([]);
    const [isError, setIsErro] = useState(false);
    const [data,setData] = useState([]);
    const [mensagemErro , setMensagemErro] = useState();
    const [ip, setIp] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if(props.cadastro){
            listarIps();
        }else{
            listarIpsGeral();
        }
    },[])

    function listarIps () {
        setIsErro(false);
        setModal(true);
        OlindaService.listarIpPorIps(props.id)
            .then((response) =>{
                let resposta = response.data;

                if(resposta.data.length >0){
                    setData(resposta.data)
                }

                setModal(false);
            }).catch((err) => {
                setIsErro(true);
                let resposta = err.response.data;

                if(resposta != undefined) {
                    resposta = resposta.msg.toString();
                } else {
                    resposta = 'Erro não reconhecido, contate o administrador.';
                }

                setMensagemErro(resposta)
                setModal(false)
        });
    }

    function listarIpsGeral () {
        setIsErro(false);
        setModal(true);
        OlindaService.listarIpGeral()
            .then((response) =>{
                let resposta = response.data;

                if(resposta.data.length >0){
                    setData(resposta.data)
                }

                setModal(false);
            }).catch((err) => {
            setIsErro(true);
            let resposta = err.response.data;

            if(resposta != undefined) {
                resposta = resposta.msg.toString();
            } else {
                resposta = 'Erro não reconhecido, contate o administrador.';
            }

            setMensagemErro(resposta)
            setModal(false)
        });
    }

    const handleCadastroIP = (e) => {
        e.preventDefault();
        setModal(true);
        setIsErro(false);

        OlindaService.criarIps(props.id, ip)
            .then((response)=>{
                let resposta = response.data;

                setModal(false);
                setData(resposta.data);
                listarIps();
                setIp('')
                setModal(false);
            })
            .catch((err)=>{
                setIsErro(true);
                let resposta = err.response.data;
                let msg = resposta.errors;

                if(msg != undefined) {
                    if(typeof msg === 'object') {
                        msg = Object.values(msg).map(function(values, index){
                            return <li key={index} style={{textAlign:'left'}}>{values.toString()}</li>
                        });
                    }
                } else {
                    msg = <li>Erro não reconhecido. Contate o administrador do sistema.</li>
                }

                setMensagemErro(msg)
                setModal(false)
            });
    }


    return (
        <div>
            <div style={{textAlign:"center", marginTop:"50px"}}>
                <h4>LISTA DE IP </h4>
            </div>

            {
                isError &&
                <div style={{width:"500px" ,textAlign:"center",margin:"50px auto", borderRadius:"6px"}} className='alert alert-danger' role="alert" >
                    <h4>Ocorreu um erro!</h4>
                    <div><ul>{mensagemErro}</ul></div>
                </div>
            }
            <Loading showModal={modal}    />


            {
                props.cadastro &&
                <div style={{float:"right", marginRight:"70px", marginTop:'0px'}}>
                    <div style={{display:"flex", padding:'15px',paddingTop:'0px', gap:'25px', alignItems:'end'}}>
                        <Input
                            value={ip}
                            id="IP"
                            placeholder="IP"
                            density="input-highlight"
                            change={(e) => {setIp(e.target.value)}}
                            />
                            
                        <Button
                            backgroundDiv={false}
                            variant="success"
                            ativo={false}
                            inverted={true}
                            loading={false}
                            titulo="Cadastrar IP"
                            tipoBlock={false}
                            disabled={false}
                            onClick={ (e) => handleCadastroIP(e)}
                            />
                    </div>
                </div>

            }


            <div>
                <Tabela dados={data} listarIps={listarIps} />
            </div>
        </div>
    )
}

export default ListarIp;
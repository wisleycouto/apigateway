import React, {useEffect, useState} from "react";
import {OlindaService} from "../../services/apiOlinda";
import Tabela from "../../GridIp";
import Button from "../../components/button";
import Input from "../../components/input";
import TabelaServicos from "../../GridServico";
import Loading from "../../components/loading";
import Select from "react-select";



const ListarServicosConsumidor = (props) => {

    const [isError, setIsError] = useState(false);
    const [data,setData] = useState([]);
    const [mensagemErro , setMensagemErro] = useState();
    const [servicos, setServicos] = useState();
    const [modal, setModal] = useState(false);
    const [idServico, setIdServico] = useState();


    useEffect(() => {
        listarServico();
        listarServicoOlinda();
    }, [])

    function listarServicoOlinda() {
        OlindaService.listarServicosPrivados()
            .then((response) =>{
                let resposta = response.data;

                if (resposta.data.length > 0) {

                    let option = Object.values(resposta.data).map(function (values, index) {
                        return {value: values.id_servicos_olinda, label: values.nome_servico.toString()}
                    });

                    setServicos(option);
                }

                setModal(false);
            }).catch((err) => {
            setIsError(true);
            let resposta = err.response.data;
            let msg = resposta.errors;

            if (msg != undefined) {
                if (typeof msg === 'object') {
                    msg = Object.values(msg).map(function (values, index) {
                        return <li key={index} style={{textAlign: 'left'}}>{values.toString()}</li>
                    });
                }
            } else {
                msg = <li>Erro não reconhecido. Contate o administrador do sistema.</li>
            }

            setMensagemErro(msg)
            setModal(false);
        });
    }

    const handleChange = selectedOption => {
        setIdServico(selectedOption.value);
    };


    function listarServico() {
        setIsError(false);
        setModal(true);

        OlindaService.listarServicosConsumidor(props.idConsumidor)
            .then((response) => {
                let resposta = response.data;

                if (resposta.data.length > 0) {
                    setData(resposta.data)
                }

                setModal(false);
            }).catch((err) => {
            setIsError(true);
            let resposta = err.response.data;

            if (resposta != undefined) {
                resposta = resposta.msg.toString();
            } else {
                resposta = 'Erro não reconhecido, contate o administrador.';
            }

            setMensagemErro(resposta)
            setModal(false)
        });
    }

    const handleVincularServico = (e) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);

        OlindaService.inserirServicoConsumidor(props.idConsumidor, idServico)
            .then((response) => {
                let resposta = response.data;
                setData(resposta.data);
                setModal(false);
                listarServico();
            })
            .catch((err) => {
                setIsError(true);
                let resposta = err.response.data;

                if (resposta != undefined) {
                    resposta = resposta.toString();
                } else {
                    resposta = 'Erro não reconhecido, contate o administrador.';
                }

                setMensagemErro(resposta)
                setModal(false)
            });
    }

    const listaBotoes = [
        ['Ativar', {
            className: 'btn btn-success',
            title: 'Ativar',
            apiCall: OlindaService.ativarServicoConsumidor,
        }],
        
        ['Desativar', {
            className: 'btn btn-danger',
            title: 'Desativar',
            apiCall: OlindaService.inativarServicoConsumidor,
        }],

        ['Editar', {
            className: 'btn btn-warning',
            title: 'Editar',
        }],
    ];


    return (
        <div>
            <div style={{textAlign: "center", marginTop: "50px"}}>
                <h4>LISTA DE SERVI&Ccedil;OS </h4>
            </div>
            {
                isError &&
                <div style={{width: "500px", textAlign: "center", margin: "50px auto", borderRadius: "6px"}}
>
                    <h4>Ocorreu um erro!</h4>
                    <div>
                        <ul>{mensagemErro}</ul>
                    </div>
                </div>
            }
            <Loading showModal={modal}/>

            <div style={{marginTop: '35px'}}>
                <div className="col-md-8" style={{float: 'left', display: 'inline'}}>
                    <Select
                        options={servicos}
                        onChange={handleChange}
                        placeholder={"Selecione um serviço"}
                    />
                </div>

                <div className="col-md-4" style={{display: 'inline', float: 'right'}}>
                    <Button
                        backgroundDiv={false}
                        variant="success"
                        ativo={false}
                        inverted={true}
                        loading={false}
                        titulo="Vincular Servi&ccedil;o"
                        tipoBlock={false}
                        disabled={false}
                        onClick={(e) => handleVincularServico(e)}
                    />
                </div>
            </div>

            <div className="col-md-12" style={{marginTop: '87px'}}>
                <TabelaServicos dados={data} listarServicos={listarServico} listaBotoes={listaBotoes} isServicoConsumidor />
            </div>
        </div>
    )

}

export default ListarServicosConsumidor;
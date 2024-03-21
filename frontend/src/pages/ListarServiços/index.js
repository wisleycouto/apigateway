import React , {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {OlindaService} from "../../services/apiOlinda";
import TabelaServicos from "../../GridServico";
import Loading from "../../components/loading";

//COMPONENTS

const ListarServico = (props) => {
    const [atualizaTabela,setAtualizaTabela] = useState([]);
    const [data,setData] = useState([]);
    const [mensagemErro, setMensagemErro] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        listarServicos();
    },[]);

    const [entry] = performance.getEntriesByType('navigation');

    if(entry['type'] == 'back_forward') {
        window.location.reload();
    }

    const listarServicos = () => {
        setModal(true);

        OlindaService.listarServicos(props.id)
            .then((response) =>{
                let resposta = response.data;
                setData(resposta.data)

                setModal(false);
            }).catch((err) => {
                let resposta = err.response.data;
                setModal(false);
                setMensagemErro(resposta.msg)
            });
    }


    const listaBotoes = [
        ['Ativar', {
            className: 'btn btn-success',
            title: 'Ativar',
            apiCall: OlindaService.ativarServico,
        }],
        
        ['Desativar', {
            className: 'btn btn-danger',
            title: 'Desativar',
            apiCall: OlindaService.excluirServicos,
        }],

        ['Editar', {
            className: 'btn btn-success',
            title: 'Editar',
        }],
    ];

    return (
        <div>
            <h3 className="text-uppercase text-center py-5">Lista de Serviços</h3>
            <Loading showModal={modal}/>
            <div>
                <TabelaServicos dados={data}  listaBotoes={listaBotoes} />
            </div>
        </div>
    )

}

export default ListarServico;
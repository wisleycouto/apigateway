import React, {useEffect, useRef, useState} from "react";
import {Grid } from "gridjs-react";
import {h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment";
import {OlindaService} from "../services/apiOlinda";
import {useParams} from "react-router-dom";
import Loading from "../components/loading";

function Tabela(props) {

    const [isError, setIsError] = useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [mensagemErro, setMensagemErro] = useState();
    const [mensagemSuccess, setMensagemSuccess] = useState();


    const [id_consumidor_ip, setId_consumidor_Ip] = useState();
    const [id_consumidor, setId_consumidor]= useState();
    const [ip, setIp] = useState();
    const [id, setId] = useState();

    const handleActivate = (e, id) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);

        OlindaService.ativarIp(id)
            .then((response)=>{
                let resposta = response.data;
                setMensagemSuccess("Ip ativado com Sucesso")
                props.listarIps();
                setModal(false);
            })
            .catch((err)=>{
                let resposta = err.response;

                if(resposta.data != undefined) {
                    resposta = resposta.data.msg.toString();
                } else {
                    resposta = 'Erro não reconhecido, contate o administrador.';
                }

                setMensagemErro(resposta)
                setModal(false)
            });
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        setModal(true);
        setIsError(false);

        OlindaService.excluirIp(id)
            .then((response)=>{
                let resposta = response.data;
                setMensagemSuccess("Ip excluido com sucesso")
                props.listarIps();
                setModal(false);
            })
            .catch((err)=>{
                let resposta = err.response;

                if(resposta.data != undefined) {
                    resposta = resposta.data.msg.toString();
                } else {
                    resposta = 'Erro não reconhecido, contate o administrador.';
                }

                setMensagemErro(resposta)
                setModal(false)
            });
    }

    const language = {
        search: {
            placeholder: " 🔍 Pesquisar"
        }
    }


    return (
        <div>
            <Loading showModal={modal}    />
            <Grid
                data={props.dados}
                search={true}
                columns={[{
                    id: 'id_consumidor_ip',
                    hidden: true
                },{
                    id: 'ip',
                    name: 'Ip do consumidor',
                },  {
                    id:'deleted_at',
                    name: 'Situação',
                    data: (row)=> {
                        if(row.deleted_at == null){
                            return "Ativo"
                        }else{
                            return "Inativo em "+moment(row.deleted_at).format('DD/MM/YYYY')
                        }
                    }
                },{
                    name: 'Atualizar',
                    formatter: (cell,row) => {
                      let isAtivo = row.cells[2].data == 'Ativo' ? true : false;

                       if(isAtivo) {
                           return h('button', {
                               className: 'btn btn-danger',
                               onClick: (e) => handleDelete(
                                   e, `${(row.cells[0].data)}`)
                           }, 'Inativar');
                       } else {
                            return h('button', {
                                className: 'btn btn-success',
                                onClick: (e) => handleActivate(
                                    e, `${(row.cells[0].data)}`)
                            }, 'Ativar');}
                       }
                },]}
                pagination={{
                    limit: 5,
                }}
                language={language}
            />
        </div>
    )
}


export default Tabela;
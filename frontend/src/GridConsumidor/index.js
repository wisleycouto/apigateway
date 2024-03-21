import React, {useEffect, useRef, useState} from "react";
import {Grid } from "gridjs-react";
import {h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Button from "../components/button";
import {OlindaService} from "../services/apiOlinda";
import redirect from "react-router-dom/es/Redirect";
import {LdapService} from "../services/ldap";
import moment from "moment";
import Loading from "../components/loading";

function Tabela(props) {
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState("");
    const [modal, setModal] = useState(false);

    const handleEdit = (e, id) => {
        e.preventDefault();
        window.location = "atualizar-consumidores/"+id;
    }

    const language = {
        search: {
            placeholder: "🔍 Pesquisar"
        }
    }

    return (
        <div style={{marginTop: "0px"}}>
            <Loading showModal={modal}/>
           <Grid
                data={props.dados}
                search={true}
                columns={[{
                    id: 'id_consumidor',
                    name: 'Id do consumidor',
                    hidden: true
                }, {
                    id: 'consumidor',
                    name: 'Consumidor',
                }, {
                    id: 'data_inicio',
                    name: 'Data Inicio',
                    data: (row)=> {
                        return moment(row.data_inicio).format('DD/MM/YYYY')
                    }
                }, {
                    id: 'data_fim',
                    name: 'Data Fim',
                    data: (row)=> {
                       return moment(row.data_fim).format('DD/MM/YYYY')
                    }
                },{
                    id: 'nome_responsavel',
                    name: 'Nome do Responsavel',

                }, {
                    id: 'email_responsavel',
                    name: 'Email',
                }, {
                    id: 'telefone_responsavel',
                    name: 'Telefone do Responsavel',
                },{
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
                    name: '',
                    formatter: (cell,row) => {
                        return h('button', {
                            className: 'btn btn-primary',
                            onClick: (e) => handleEdit(
                                e, `${(row.cells[0].data)}`)
                        }, 'Atualizar Informações');}
                }]}
                pagination={{
                    limit: 5,
                }}
                language={language}
            />
        </div>
    )
}


export default Tabela;
import React, {useEffect, useRef, useState} from "react";
import {Grid } from "gridjs-react";
import {h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment";

function Tabela(props) {

    const [isError, setIsError] = useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [mensagemErro, setMensagemErro] = useState();


    const [id_consumidor_ip, setId_consumidor_Ip] = useState();
    const [id_consumidor, setId_consumidor]= useState();
    const [ip, setIp] = useState();
    const [client_user, setClient_user] = useState();
    const [id, setId] = useState();

    const handleEdit = (e, id) => {
        e.preventDefault();
        setModal(false);
        setIsError(false);
        setShowTable(false);

        window.location = "/vincular-ip/"+id;
    }

    const language = {
        search: {
            placeholder: " 🔍 Pesquisar"
        }
    }


    return (
        <div style={{marginTop: "165px"}}>
            <Grid
                data={props.dados}
                search={true}
                columns={[{
                    id: 'id_consumidor_ip',
                    name: 'Id do consumidor IP',
                }, {
                    id: 'id_consumidor',
                    name: 'Id do consumidor'
                }, {
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
                    name: 'Vincular IP ',
                    formatter: (cell,row) => {
                        return h('button', {
                            className: 'btn btn-success',
                            onClick: (e) => handleEdit(
                                e, `${(row.cells[0].data)}`)
                        }, 'Cadastrar IP');}
                }
                ]}
                pagination={{
                    limit: 5,
                }}
                language={language}
            />
        </div>

    )

}


export default Tabela;
import React, {useEffect, useRef, useState} from "react";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment";
import Loading from "../components/loading";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import Scrim from "../components/Scrim";


function TabelaServicos(props) {
    const [modal, setModal] = useState(false);
    const [mensagemErro, setMensagemErro] = useState('');
    const [nomeServico, setNomeServico] = useState('');
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [deleteFunction, setDeleteFunction] = useState(undefined);

    const editIcon     = <FontAwesomeIcon icon={faEdit} fixedWidth/>;
    const inativarIcon = <FontAwesomeIcon icon={faTrashAlt} fixedWidth/>;
    const ativarIcon   = <FontAwesomeIcon icon={faUndoAlt} fixedWidth/>;

    useEffect(() => {
        if (!props.listaBotoes) {
            console.log('Erro ao receber botoes de acao!');
        }

    }, []);

    let listaBotoes = undefined;
    if (props.listaBotoes) {
        listaBotoes = new Map(props.listaBotoes);
    } else {
        listaBotoes = new Map([
            [
                "Desativar",
                {
                    className: 'btn btn-danger',
                    title: 'Desativar',
                    apiCall: id => {},
                },
            ],
            [
                "Ativar",
                {
                    className: 'btn btn-success',
                    title: 'Ativar',
                    apiCall: id => {},
                }
            ],
            [
                "Editar",
                {
                    className: 'btn btn-success',
                    title: 'Editar',
                }
            ]
        ]);
    }
    
    function handleAPICall(id, apiCall) {
        if (props.listaBotoes) {
            setModal(true);
            apiCall(id).then(resposta => {
                props.listarServicos();
                setModal(false);
            }).catch(error => {
                let errorMsg = '';
    
                if(error.response) {
                    errorMsg = error.response;
                } else {
                    errorMsg = 'Erro desconhecido, contante o administrador.';
                }
    
                setMensagemErro(errorMsg);
                setModal(false);
            })

        }
    }

    const handleEdit = id => {
        window.location = "../editar-servico/"+id;
    }

    function askForDeletion(delFunction, serviceName) {

        setshowDeleteModal(true);
        setDeleteFunction(() => delFunction);
        setNomeServico(serviceName);
    }

    const language = {
        search: {
            placeholder: " 🔍 Pesquisar"
        },
        pagination: {
            'previous': 'Anterior',
            'next': 'Próximo',
            'showing': 'Mostrando',
            'results': () => 'registros',
            'to': 'a',
            'of': 'de',
        },
    }


    return (
        <div>
            <Loading showModal={modal}/>
            <Scrim
                title={'Tem Certeza?'}
                desc={<p>Deseja realmente desativar <strong>{nomeServico}</strong>?</p>} // String | Component
                buttons={[{
                    label: 'Sim',
                    action: () => {
                        deleteFunction();
                    },
                    class: 'primary',
                },
                {
                    label: 'Não',
                    action: () => {
                        setshowDeleteModal(false);
                    },
                    class: 'secondary',
                }]}
                showModal={showDeleteModal}
                onModalActiveChange={(modalisActive) => { 
                    if(!modalisActive) {
                        setshowDeleteModal(false);
                    } 
                }}
            />

            <Grid
                data={props.dados}
                search={true}
                columns={[{
                    id:'id_servicos_olinda',
                    hidden: true
                },
                {
                    id:'id_consumidor_servicos',
                    hidden: true
                },
                {
                    id: 'nome_servico',
                    name:'Nome do Serviço'
                },{
                    id: 'servico_publico',
                    name:'Tipo Serviço',
                    data:(row)=>{
                        if (row.servico_publico == 1){
                            return "Público"
                        }else {
                            return "Privado"
                        }
                    }
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
                    name: 'Ações',
                    formatter: (cell,row) => {
                        const isAtivo = row.cells[4].data == 'Ativo' ? true : false;
                        
                        const idConsumidorServico = row.cells[1].data;
                        const idServico = row.cells[0].data;
                        const serviceName = row.cells[2].data;

                        const realId = props.isServicoConsumidor? idConsumidorServico : idServico;
                        
                        let activationButtonProps = undefined;
                        let EditButton = undefined;

                        if(isAtivo) {
                            activationButtonProps = listaBotoes.get('Desativar'); 
                            activationButtonProps.children = 'Inativar';

                            const editButtonProps = listaBotoes.get('Editar');
                            editButtonProps.children = editIcon;

                            EditButton = (<button 
                                            className={editButtonProps.className} 
                                            style={{margin: '0.1rem'}} 
                                            title={editButtonProps.title} 
                                            onClick={ event => {
                                                        event.preventDefault();

                                                        handleEdit(idServico);
                                                    }}>
                                                {editButtonProps.children}
                                            </button>);

                        } else {
                            activationButtonProps = listaBotoes.get('Ativar');
                            activationButtonProps.children = 'Ativar';
                        }                        

                        const ActivationButton = (<button 
                                                    className={activationButtonProps.className} 
                                                    title={activationButtonProps.title}
                                                    onClick={event => { 
                                                        event.preventDefault();

                                                        if(isAtivo) {
                                                            askForDeletion(() => handleAPICall(realId, activationButtonProps.apiCall), serviceName);
                                                        } else {
                                                            handleAPICall(realId, activationButtonProps.apiCall);
                                                        }
                                                    }}
                                                    style={{margin: '0.1rem'}}
                                                >
                                                    {activationButtonProps.children}
                                                </button>);

                        const ActivationButtonTransform = h('button', ActivationButton.props, activationButtonProps.children);
                        const EditButtonTransform = EditButton && h('button', EditButton.props, 'Editar');

                        return h('div', {className: 'action-buttons'}, [EditButtonTransform, ActivationButtonTransform]);
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


export default TabelaServicos;
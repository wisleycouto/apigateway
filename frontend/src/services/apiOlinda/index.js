import apiOlinda from "../api";
import moment from "moment";
export const OlindaService = {

    criarConsumidor: function(data_inicio,data_fim, num_sei,email_responsavel,nome_responsavel,telefone_responsavel, consumidor){
        return apiOlinda.post('/consumidor/create', {
            "data_inicio":data_inicio,
            "data_fim":data_fim,
            "num_sei":num_sei,
            "email_responsavel":email_responsavel,
            "nome_responsavel":nome_responsavel,
            "telefone_responsavel":telefone_responsavel,
            'consumidor': consumidor
        })
    },

    atualizarConsumidor:function (id,data_inicio,data_fim, num_sei,email_responsavel,nome_responsavel,telefone_responsavel, consumidor) {
        return apiOlinda.post('/consumidor/update/'+id,
    {
            "data_inicio":moment(data_inicio).format('YYYY-MM-DD'),
            "data_fim":moment(data_fim).format('YYYY-MM-DD'),
            "num_sei":num_sei,
            "email_responsavel":email_responsavel,
            "nome_responsavel":nome_responsavel,
            "telefone_responsavel":telefone_responsavel,
            "consumidor": consumidor
        })
    },

    excluirConsumidor:function (id){
        return apiOlinda.delete('/consumidor/delete/'+id)
    },
    restaurarConsumidor:function (id){
        return apiOlinda.post('/consumidor/restore/'+id)
    },

    listarconsumidor:function (){
        return apiOlinda.get('/consumidor')
    },

    listarIdConsumidor:function (id){
        return apiOlinda.get('/consumidor/'+id)
    },

    criarIps:function (id, ip)
    {
        return apiOlinda.post('/ips/create/'+id,
    {
            "ip":ip
        })
    },

    atualizarIps:function (id, ip)
    {
        return apiOlinda.post('/ips/update/'+id,
            {
                "ip":ip
            })
    },

    excluirIp:function (id){
        return apiOlinda.delete('/ips/delete/'+id)
    },

    ativarIp:function (id){
        return apiOlinda.post('/ips/restore/'+id)
    },

    listarIps:function (){
        return apiOlinda.get('/ips/get')
    },

    listarIpPorIps:function (id){
        return apiOlinda.get('/ips/get-ips/'+id)
    },

    listarIpGeral:function (){
        return apiOlinda.get('/ips/get-ips')
    },

    criarServicos:function (nome_servico,url_servico,servico_publico, servico)
    {
        return apiOlinda.post('/servicos/create',
        {
            "nome_servico":nome_servico,
            "url_servico":url_servico,
            "servico":servico,
            "servico_publico":servico_publico
        })
    },

    atualizarServicos:function (id,nome_servico,url_servico,servico_publico, servico){
        return apiOlinda.post('/servicos/update/' + id,{
            "nome_servico":nome_servico,
            "url_servico":url_servico,
            "servico_publico":servico_publico,
            "servico":servico,
        })
    },

    excluirServicos:function (id){
        return apiOlinda.delete('/servicos/delete/'+id)
    },

    ativarServico:function (id){
        return apiOlinda.post('/servicos/restore/'+id)
    },

    listarServicos:function (){
        return apiOlinda.get('/servicos/get')
    },

    listarIdServico: function (id) {
        return apiOlinda.get(`servicos/get-servicos/${id}`);
    },

    listarServicosPrivados:function (){
        return apiOlinda.get('/servicos/privados/get')
    },

    listarServicosIps:function (id){
        return apiOlinda.get('/servicos/get/'+id)
    },

    inserirServicoConsumidor:function (idConsumidor, idServico){
        return apiOlinda.post('/consumidor/insert-service/'+idConsumidor, {
            "id_servicos_olinda": idServico
        })
    },

    listarServicosConsumidor(id){
        return apiOlinda.get('/consumidor/list-service/'+id)
    },

    ativarServicoConsumidor:function (idConsumidorServico){
        return apiOlinda.post('/consumidor/service/'+idConsumidorServico)
    },

    inativarServicoConsumidor:function (idConsumidorServico){
        return apiOlinda.delete('/consumidor/service/'+idConsumidorServico)
    },
}
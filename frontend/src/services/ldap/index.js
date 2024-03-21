import apiOlinda from "../api";

export const LdapService = {
    consultarLdap: function (usuario, password){

        return apiOlinda.post("/connect" , {"username": usuario, "password": password})
    }
}

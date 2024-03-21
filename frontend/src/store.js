import { createStore } from 'redux'

const INITIAL_STATE = {
  data: {
    nome: null,
    cpf: null,
    email: null,
    logado: false,
  }
}

function logar(state = INITIAL_STATE, action)
{
  switch (action.type) {
    case 'LOGAR': 
      return {data: action.data};
    default:
      return state;
  }
}

const store = createStore(logar);

export default store;
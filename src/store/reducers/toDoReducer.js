const INITIAL_STATE = {
  lista: [],
  idInicial: 1
};

function toDoReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "inserir":
      return {
        ...state,
        lista: [...state.lista, action.payload],
      };
    case "excluir":
      return {
        ...state,
        lista: action.payload,
      };
		case "editar":
			return{
				...state,
				lista: action.payload
			}
		case "alterarStatus":
			return{
				...state,
				lista:action.payload
			}
    case "incrementarId":
    console.log('action.id ', action.id)  
    return {
        ...state,
        idInicial: action.id
      }
    default:
      return state;
  }
}

export default toDoReducer;

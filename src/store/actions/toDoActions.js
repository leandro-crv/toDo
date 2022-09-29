import {store} from '../index';

import {produce} from 'immer';

const dispatch = store.dispatch;

const getLista = () => store.getState().toDoReducer.lista;
const getIdInicial = () => store.getState().toDoReducer.idInicial;

// função retorna o index no array lista de acordo com id buscado
const getIndex = (id) => getLista().findIndex(item => item.id === id);


export const inserir = (descricao) => {
  // Se houver texto inserido, insere novo id e atualiza lista
  if (descricao.length) {
    let id = getIdInicial()
    dispatch({
      type: "inserir",
      payload: {
        descricao,
        concluida: false,
        id,
      },
    });

    dispatch({
      type:'incrementarId',
      id: id + 1
    })
  }
};

export const editar = (id,descricao) => {
  if(isNaN(id) || !descricao.length){
    return
  }
  let lista = getLista();
  let index = getIndex(id);
  
  const nextState = produce(lista, draftState => {
    draftState[index].descricao = descricao
  })
 

  dispatch({
    type:'editar',
    payload: nextState
  })

}

// altera status da tarefa. Se tiver concluída volta para não concluída e vice-versa

export const alterarStatus = (id) => {
  if(isNaN(id)) return
  let lista = getLista();
  let index = getIndex(id);

  const nextState = produce(lista, draftState => {
    draftState[index].concluida = !draftState[index].concluida
  })

  dispatch({
    type:'alterarStatus',
    payload: nextState
  })
}

export const excluir = (id) => {
	if(id >=0){
		const lista = getLista();
		dispatch({
			type:'excluir',
			payload: lista.filter(item => item.id !== id)
		})

	}
}


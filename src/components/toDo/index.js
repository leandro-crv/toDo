import { connect } from "react-redux";
import {
  inserir,
  excluir,
  editar,
  alterarStatus,
} from "../../store/actions/toDoActions";
import { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Card from '../card';

const ToDo = ({ lista }) => {
	
	//Filtros - cada alteração na lista toDo é realizada contagem e separadas listas por status: 
	// todas solicitações, concluídas e não concluídas
	const [listaFiltrada, setListaFiltrada] = useState([]);
	const [filtro, setFiltro] = useState('todas');
  const [todas, setTodas] = useState([]);
  const [concluidas, setConcluidas] = useState([]);
  const [naoConcluidas, setNaoConcluidas] = useState([]);

	useEffect(() => {
    filtrarLista();
  }, [lista, filtro]);

  const filtrarLista = () => {
		const newTodas = lista;
		const newConcluidas = lista.filter((item) => item.concluida === true);
		const newNaoConcluidas = lista.filter((item) => item.concluida === false);
		
		setTodas(newTodas)
    setConcluidas(newConcluidas);
    setNaoConcluidas(newNaoConcluidas);
		
		if(filtro === 'todas'){
			setListaFiltrada(newTodas)
		}
		else if(filtro === 'concluidas'){
			setListaFiltrada(newConcluidas);
		}
		else{
			setListaFiltrada(newNaoConcluidas);
		}
  };
  
	
	// Captura tarefa que será enviada pela função enviar()
	const [input, setInput] = useState("");

	// Abre input para edição de texto da tarefa. Se confirmada a edição chama a funcao 'concluirEdicao'. Para voltar ao valor original chama função 'cancelarEdicao'

	const [modalEdicao, setModalEdicao] = useState({})
  const [textoEdicao, setTextoEdicao] = useState({});

	const openModalEdicao = (id) => {
		if(!modalEdicao[id]){
			let texto = lista.find(item => item.id === id).descricao
			setTextoEdicao({
				[id] : texto
			})
		}
		setModalEdicao({
			[id] : !modalEdicao[id]
		})
		
	}

  const handleEdicao = (id, value) => {
    setTextoEdicao({
      [id]: value,
    });
  };

	const concluirEdicao = (id) => {
		editar(id, textoEdicao[id])
		openModalEdicao(id)
	}

	const cancelarEdicao = (id) => {
		let copiaTextoEdicao = textoEdicao;
		copiaTextoEdicao[id] = '';
		setTextoEdicao(copiaTextoEdicao);
		openModalEdicao(id)
	}
 
  return (
    <Box 
			sx={{
				display:'flex',
				flexDirection:'column',
				gap:2,
				p:2,
				alignItems:'center'
			}}
		>
      <Typography variant='h3'>Lista de Tarefas</Typography>
     
			<ToggleButtonGroup
				value={filtro}
				onChange={(e) => setFiltro(e.target.value)}
				exclusive
			>
				<ToggleButton value='todas' aria-label='Todas'>
					Todas ({todas.length})
				</ToggleButton>
				<ToggleButton value='concluidas' aria-label='Concluídas'>
					Concluídas ({concluidas.length})
				</ToggleButton>
				<ToggleButton value='naoConcluidas' aria-label='Não concluídas'>
					Não concluídas ({naoConcluidas.length})
				</ToggleButton>
			</ToggleButtonGroup>
      <TextField
        variant="outlined"
        placeholder="Adicionar nova tarefa"
        type="text"
        id="inputInserir"
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            inserir(input);
						setInput("");
          }
        }}
        value={input}
        maxLength={50}
      />
      <Button type="button" variant="contained" onClick={() => inserir(input)}>
        Adicionar
      </Button>

      <List>
        {lista?.length > 0 &&
          listaFiltrada.map((item, index) => (
            <ListItem key={index}>
              <Card 
								id={item.id}
								descricao={item.descricao}
								concluida={item.concluida}
								alterarStatus={alterarStatus}
								excluir={excluir}
								cancelarEdicao={cancelarEdicao}
								concluirEdicao={concluirEdicao}
								textoEdicao={textoEdicao}
								handleEdicao={handleEdicao}
								modalEdicao={modalEdicao}
								openModalEdicao={openModalEdicao}
							/>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  lista: state.toDoReducer?.lista,
});
export default connect(mapStateToProps)(ToDo);

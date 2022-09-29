import {
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const Card = ({
  id,
  descricao,
  concluida,
  alterarStatus,
  excluir,
  cancelarEdicao,
  concluirEdicao,
	textoEdicao,
	handleEdicao,
	modalEdicao,
  openModalEdicao,
}) => {
  return (
	<Box
    component={Paper}
    sx={{
      minWidth: 450,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      p: 2,
      backgroundColor: concluida ? '#c8e6c9' : ''
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">
        <small>status:</small>
        {concluida ? "Concluída" : "Não concluída"}
      </Typography>
      <Button
        variant="outlined"
        type="button"
        onClick={() => alterarStatus(id)}
        color={concluida ? "error" : "success"}
      >
        {concluida ? "Desfazer" : "Concluir"}
      </Button>
    </Box>
    <Divider />
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        alignItems: "center",
      }}
    >
      {!modalEdicao[id] ? (
        <>
          <Typography variant="h4">{descricao}</Typography>
          <Box>
            <IconButton onClick={() => openModalEdicao(id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => excluir(id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <TextField
          variant="outlined"
          type="text"
          id="inputEditar"
          onChange={(e) => handleEdicao(id, e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" && textoEdicao[id]?.length) {
              concluirEdicao(id);
            }
          }}
          value={textoEdicao[id]}
          maxLength={50}
          InputProps={{
            endAdornment: (
              <>
                <IconButton onClick={() => cancelarEdicao(id)}>
                  <ClearIcon />
                </IconButton>
                <IconButton onClick={() => concluirEdicao(id)}>
                  <CheckIcon />
                </IconButton>
              </>
            ),
          }}
        />
      )}
    </Box>
  </Box>
	);
};

export default Card;

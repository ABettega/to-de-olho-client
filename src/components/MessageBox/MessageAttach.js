import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import LoadingIcon from "../../components/LoadingIcon";
import './MessageAttach.css';


function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {

  return (
    <div>
      <Dialog
        open={true}
        // onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="dialog">
            <ul className="ul-sessoes-votacoes">
            {props.sessoesPresenca ? props.sessoesPresenca.map(sessao => {
              if (sessao.nomeDaSessao) {
                return <li>{sessao.nomeDaSessao}</li>
              } else if (sessao.documento) {
                return <li><a className="link-to-votes" href={`/deputado/votacao/${sessao._id}`}>{props.dateWithBars(sessao.dataInicio.slice(0, 10))}: <span>{sessao.documento.siglaTipo} {sessao.documento.numero}/{sessao.documento.ano}</span> - {sessao.proposicao}</a></li>
              }
            }) :
            <div className="loading-icon-container-msg">
              <LoadingIcon />
              <p>Carregando</p>
            </div>
            }
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancelMessageBox} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

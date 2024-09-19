import { useState } from "react";
import Entrada from "./Entrada"
import Botao from "./Botao";
import Usuario from "../core/Usuario";
import Tarefa from "../core/Tarefas";

interface FormularioProps{
  objeto: any,
  tipoObjeto: 'tarefa' | 'usuario',
  cancelar?: () => void,
  objetoMudou?: (objeto: any) => void
}

export default function Formulario(props: FormularioProps){
  const id = props.objeto?.id;
  const [nome, setNome] = useState(props.objeto?.nome ?? '');
  const [cargo, setCargo] = useState(props.objeto?.cargo ?? '');
  const [descricao, setDescricao] = useState(props.objeto?.descricao ?? '');
  const [tempoPrevisto, setTempoPrevisto] = useState(props.objeto?.tempoPrevisto ?? '');

  function renderEntradas(){
    if(props.tipoObjeto === 'usuario'){
      return(
        <>
          { id ? <Entrada texto='ID' valor={id}/> : false }
          <Entrada texto='Nome' valor={nome} valorMudou={setNome}/>
          <Entrada texto='Cargo' valor={cargo} valorMudou={setCargo}/>
        </>
      )
    }else if(props.tipoObjeto === 'tarefa'){
      return(
        <>
          { id ? <Entrada texto='ID' valor={id}/> : false }
          <Entrada texto='Nome Tarefa' valor={nome} valorMudou={setNome}/>
          <Entrada texto='Descrição' valor={descricao} valorMudou={setDescricao}/>
          <Entrada texto='Tempo Previsto' tipo='date' valor={tempoPrevisto} valorMudou={setTempoPrevisto}/>
        </>
      )
    }
  }

  function getDias(tempoPrevisto){
    const data = new Date(tempoPrevisto);
    data.setDate(data.getDate() + 1);
    data.setHours(data.getHours() + 2);
    data.setMinutes(data.getMinutes() + 59);
    return data.getTime();
  }

  return(
    <div>
      {renderEntradas()}

      <div className="flex justify-end mt-7">
        <Botao cor='blue' className="mr-2" 
          onClick={() => {
            props.tipoObjeto === 'usuario' ?
              props.objetoMudou?.(new Usuario(nome, cargo, id)) :
              props.objetoMudou?.(new Tarefa(nome, props.objeto?.nomeResponsavel, descricao, props.objeto?.horaCriacao, getDias(tempoPrevisto), id, props.objeto?.status, props.objeto?.dataInicio))
            }}
          >
            {id ? 'Alterar':'Salvar'}
        </Botao>
        <Botao onClick={props.cancelar}>Cancelar</Botao>
      </div>
    </div>
  )
}
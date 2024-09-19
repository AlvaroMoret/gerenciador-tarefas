import React from "react";
import Tarefa from "../core/Tarefas";

interface CartaoProps{
    tarefa: Tarefa
    click: (tarefa: Tarefa) => void
}

export default function Cartao(props: CartaoProps){

  function renderTempo(){
    let dias;
    let horas;
    let atraso;
    let diferenca;
    const dataPrevista = new Date(props.tarefa.tempoPrevisto);
    if(props.tarefa.status === 'CONCLUIDA'){
      const dataConclusao = new Date(props.tarefa.dataConclusao);
      diferenca = dataPrevista.getTime() - dataConclusao.getTime();
      atraso = diferenca < 0;
    }else{
      diferenca = Date.now() - dataPrevista.getTime();
      atraso = diferenca > 0;
    }
    diferenca = Math.abs(diferenca);
    dias = diferenca / 86400000;
    horas = diferenca / 3600000;
    return(<p className={`text-${!atraso ? 'green' : 'red'}-400`}>{dias >= 1 ? `${Math.floor(dias)} dias`:  `${Math.floor(horas)} horas`}</p>)
  }

  return (
    <div onClick={() => props.click?.(props.tarefa)}>
      <div className='flex p-2 flex-col gap-3 bg-gray-600 rounded-md min-h-2 cursor-pointer'>
        <div className='font-mono text-sm'>
          <p>{props.tarefa.nome}</p>
        </div>
        <div className='font-mono text-xs'>
          <p>{props.tarefa.nomeResponsavel}</p>
        </div>
        <div className='flex justify-between font-mono text-xs'>
          <p>{renderTempo()}</p>
          <p>&gt;</p>
        </div>
      </div>
    </div>
  )
}
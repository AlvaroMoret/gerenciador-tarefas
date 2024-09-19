import Cartao from './Cartao'

export default function Quadro(props: any){

  function renderTarefas(status: 'ATIVA' | 'CONCLUIDA' | 'EM ANDAMENTO'){
    return props.tarefas?.filter(tarefa => tarefa.status == status).map((tarefa, i) => {
      return(
        <Cartao key={tarefa.id} tarefa={tarefa} click={props.selecionar}></Cartao>
      )
    });
  }

  return (
    <div className='flex gap-2 overflow-auto'>
      <div className='flex flex-col bg-black rounded-md min-w-52 min-h-52'>
        <div className='flex px-3 justify-between font-mono'>
          <p>Ativas</p>
          <p>{props.tarefas?.filter(tarefa=>tarefa.status == 'ATIVA').length}</p>
        </div>
        <div className='flex flex-col gap-2 px-3 py-3'>
          {renderTarefas('ATIVA')}
        </div>
      </div>
      <div className='flex flex-col bg-black rounded-md min-w-52 min-h-52'>
        <div className='flex px-3 justify-between font-mono'>
          <p>Em Andamento</p>
          <p>{props.tarefas?.filter(tarefa=>tarefa.status == 'EM ANDAMENTO').length}</p>
        </div>
        <div className='flex flex-col gap-2 px-3 py-3'>
          {renderTarefas('EM ANDAMENTO')}
        </div>
      </div>
      <div className='flex flex-col bg-black rounded-md min-w-52 min-h-52'>
        <div className='flex px-3 justify-between font-mono'>
          <p>Concluidas</p>
          <p>{props.tarefas?.filter(tarefa=>tarefa.status == 'CONCLUIDA').length}</p>
        </div>
        <div className='flex flex-col gap-2 px-3 py-3'>
          {renderTarefas('CONCLUIDA')}
        </div>
      </div>
    </div>
  )  
}
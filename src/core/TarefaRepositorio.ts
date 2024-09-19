import Tarefa from "./Tarefas"

export default interface ClienteRepositorio{
  salvar(tarefa:Tarefa): Promise<Tarefa>
  excluir(tarefa:Tarefa): Promise<void>
  obterTodos(): Promise<Tarefa[]>
  obterPorId(id: string): Promise<Tarefa>
}
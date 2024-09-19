import firebase from '../config'
import Tarefa from '@/src/core/Tarefas'
import TarefaRepositorio from '@/src/core/TarefaRepositorio'

export default class ColecaoTarefa implements TarefaRepositorio{
  #conversor = {
    toFirestore(Tarefa: Tarefa){
      return {
        nome: Tarefa.nome ?? null,
        nomeResponsavel: Tarefa.nomeResponsavel ?? null,
        descricao: Tarefa.descricao ?? null,
        dataInicio: Tarefa.dataInicio ?? null,
        horaCriacao: Tarefa.horaCriacao ?? null,
        tempoPrevisto: Tarefa.tempoPrevisto ?? null,
        status: Tarefa.status ?? null,
        dataConclusao: Tarefa.dataConclusao ?? null
      }
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Tarefa{
      const dados = snapshot.data(options);
      return new Tarefa(dados.nome, dados.nomeResponsavel, dados.descricao, dados.horaCriacao, dados.tempoPrevisto, snapshot.id, dados.status, dados.dataInicio, dados.dataConclusao)
    }
  }

  #colecao(){
    return firebase.firestore().collection('tarefas').withConverter(this.#conversor);
  }

  async salvar(tarefa:Tarefa): Promise<Tarefa>{
    if(tarefa?.id){
      await this.#colecao().doc(tarefa.id).set(tarefa)
      return(tarefa)
    }else{
      const docRef = await this.#colecao().add(tarefa)
      const doc = await docRef.get();

      return doc.data() as Tarefa
    }
  }

  async excluir(tarefa:Tarefa): Promise<void>{
    return this.#colecao().doc(tarefa.id as string).delete()
  }

  async obterTodos(): Promise<Tarefa[]>{
    const query = await this.#colecao().get()
    return query.docs.map(doc => doc.data() ?? []);
  }

  async obterPorId(id: string): Promise<Tarefa>{
    const doc = await this.#colecao().doc(id).get();
    return doc.data() as Tarefa;
  }
}
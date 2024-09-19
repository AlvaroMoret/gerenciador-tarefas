export default class Tarefa{
  #id?: string|null
  #nome?: string
  #nomeResponsavel?: string
  #descricao?: string
  #dataInicio?: any
  #horaCriacao?: any
  #tempoPrevisto?: any
  #status: 'ATIVA' | 'CONCLUIDA' | 'EM ANDAMENTO'
  #dataConclusao?: any

  constructor(nome: string|undefined, nomeResponsavel: string|undefined = undefined, descricao: string|undefined, horaCriacao: any, tempoPrevisto: any, id: string|null = null, status: 'ATIVA' | 'CONCLUIDA' | 'EM ANDAMENTO' = 'ATIVA', dataInicio: any = null, dataConclusao: any = null){
    this.#nome = nome
    this.#nomeResponsavel = nomeResponsavel
    this.#descricao = descricao
    this.#dataInicio = dataInicio
    this.#horaCriacao = horaCriacao
    this.#tempoPrevisto = tempoPrevisto
    this.#status = status
    this.#id = id
    this.#dataConclusao = dataConclusao
  }

  get id(){
    return this.#id
  }

  get nomeResponsavel(){
    return this.#nomeResponsavel
  }

  set nomeResponsavel(nomeResponsavel){
    this.#nomeResponsavel = nomeResponsavel
  }

  get nome(){
    return this.#nome
  }

  get descricao(){
    return this.#descricao
  }

  get dataInicio(){
    return this.#dataInicio
  }

  set dataInicio(dataInicio){
    this.#dataInicio = dataInicio
  }

  get dataConclusao(){
    return this.#dataConclusao
  }

  set dataConclusao(dataConclusao){
    this.#dataConclusao = dataConclusao
  }

  get horaCriacao(){
    return this.#horaCriacao
  }

  set horaCriacao(horaCriacao){
    this.#horaCriacao = horaCriacao
  }

  get tempoPrevisto(){
    return this.#tempoPrevisto
  }

  get status(){
    return this.#status
  }

  set status(status: 'ATIVA' | 'CONCLUIDA' | 'EM ANDAMENTO'){
    this.#status = status
  }
}
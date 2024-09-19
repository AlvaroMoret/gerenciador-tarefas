export default class Usuario{
  #id: string|null
  #nome: string
  #cargo: string

  constructor(nome: string, cargo: string, id: string|null = null){
    this.#nome = nome
    this.#cargo = cargo
    this.#id = id
  }

  get id(){
    return this.#id
  }

  get nome(){
    return this.#nome
  }

  set nome(nome: string){
    this.#nome = nome
  }

  get cargo(){
    return this.#cargo
  }

  set cargo(cargo: string){
    this.#cargo = cargo
  }

  static vazio(){
    return new Usuario('', '')
  }
}
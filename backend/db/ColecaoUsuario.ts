import firebase from '../config'
import Usuario from '@/src/core/Usuario'
import UsuarioRepositorio from '@/src/core/UsuarioRepositorio'

export default class ColecaoUsuario implements UsuarioRepositorio{
  #conversor = {
    toFirestore(usuario: Usuario){
      return{
        nome: usuario.nome,
        cargo: usuario.cargo
      }
    },
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Usuario{
      const dados = snapshot.data(options);
      return new Usuario(dados.nome, dados.cargo, snapshot.id)
    }
  }

  #colecao(){
    return firebase.firestore().collection('usuario').withConverter(this.#conversor);
  }

  async salvar(usuario:Usuario): Promise<Usuario>{
    if(usuario?.id){
      await this.#colecao().doc(usuario.id).set(usuario)
      return(usuario)
    }else{
      const docRef = await this.#colecao().add(usuario)
      const doc = await docRef.get();

      return doc.data() as Usuario
    }
  }

  async excluir(usuario:Usuario): Promise<void>{
    return this.#colecao().doc(usuario.id as string).delete()
  }

  async obterTodos(): Promise<Usuario[]>{
    const query = await this.#colecao().get()
    return query.docs.map(doc => doc.data() ?? []);
  }
}
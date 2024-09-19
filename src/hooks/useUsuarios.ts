import Usuario from "../core/Usuario"
import { useState, useEffect } from "react"

import UsuarioRepositorio from "../core/UsuarioRepositorio"
import ColecaoUsuario from "@/backend/db/ColecaoUsuario"

export default function useUsuario(){
  const [usuario, setUsuario] = useState<Usuario>(Usuario.vazio());
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const repo: UsuarioRepositorio = new ColecaoUsuario();

  useEffect(obterTodos, [])

  function obterTodos(){
    repo.obterTodos().then(usuarios => {
        setUsuarios(usuarios)
    });
  }

  async function selecionarUsuario(usuario: Usuario){
    await setUsuario(usuario);
  }

  async function excluirUsuario(usuario: Usuario){
    await repo.excluir(usuario)
    obterTodos();
  }

  async function salvarUsuario(usuario: Usuario){
    await repo.salvar(usuario);
    obterTodos();
  }

  function novoUsuario(){
    setUsuario(Usuario.vazio())
  }

  return{
    novoUsuario,
    salvarUsuario,
    excluirUsuario,
    selecionarUsuario,
    obterTodos,
    usuario,
    usuarios
  }
}
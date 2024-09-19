import { useState } from "react"

import Layout from "../components/Layout"
import Tabela from "../components/Tabela"
import Quadro from "../components/Quadro"
import Botao from "../components/Botao"
import Formulario from "../components/Formulario"
import Informacoes from "../components/Informacoes"

import useTarefas from "../hooks/useTarefas"
import useUsuarios from "../hooks/useUsuarios"
import Head from "next/head"

export default function Home(){

  const [visivel, setVisivel] = useState<number>(1);

  async function adicionarNovaTarefa(){
    await novaTarefa();
    setVisivel(3);
  }

  async function salvarTarefaAtual(tarefaSelecionada){
    await salvarTarefa(tarefaSelecionada);
    setVisivel(1);
  }

  async function excluirTarefaSelecionada(tarefaSelecionada){
    await excluirTarefa(tarefaSelecionada);
    setVisivel(1);
  }

  async function selecionarTarefaInfo(tarefaSelecionada){
    await selecionarTarefa(tarefaSelecionada);
    setVisivel(5);
  }

  async function editarTarefa(tarefaSelecionada){
    await selecionarTarefa(tarefaSelecionada);
    setVisivel(3);
  }

  async function adicionarNovoUsuario(){
    await novoUsuario();
    setVisivel(4);
  }

  async function concluirTarefaSelecionada(tarefaSelecionada){
    await concluirTarefa(tarefaSelecionada);
    setVisivel(1);
  }

  async function editarUsuario(usuarioSelecionado){
    await selecionarUsuario(usuarioSelecionado);
    setVisivel(4);
  }

  async function salvarUsuarioAtual(usuarioSelecionado){
    await salvarUsuario(usuarioSelecionado);
    setVisivel(2);
  }


  const {
    tarefa,
    tarefas,
    salvarTarefa,
    novaTarefa,
    selecionarTarefa,
    excluirTarefa,
    concluirTarefa,
  } = useTarefas()
  
  const {
    novoUsuario,
    salvarUsuario,
    excluirUsuario,
    selecionarUsuario,
    usuario,
    usuarios,
  } = useUsuarios()

  function renderLayout(){
    switch (visivel) {
      case 1:
        return (
          <Layout titulo="Quadro Kanbam" clickAdicao={() => adicionarNovaTarefa()}>
            <Quadro tarefas={tarefas} selecionar={selecionarTarefaInfo}/>
          </Layout>
        )
    
      case 2:
        return (
          <Layout titulo="Gerenciar Equipe" clickAdicao={() => adicionarNovoUsuario()}>
            <Tabela objeto={usuarios} objetoSelecionado={editarUsuario} objetoExcluido={excluirUsuario}/>
          </Layout>
        )

      case 3:
        return (
          <Layout titulo={tarefa?.id ? 'Editar Tarefa' : 'Nova Tarefa'}>
            <Formulario objeto={tarefa} cancelar={() => setVisivel(1)} objetoMudou={salvarTarefaAtual} tipoObjeto="tarefa"/>
          </Layout>
        )

      case 4:
        return (
          <Layout titulo={usuario?.id ? 'Editar Usuario' : 'Novo Usuario'}>
            <Formulario objeto={usuario} cancelar={() => setVisivel(2)} objetoMudou={salvarUsuarioAtual} tipoObjeto="usuario"/>
          </Layout>
        )

      case 5:
        return (
          <Informacoes tarefa={tarefa} voltar={() => setVisivel(1)} excluir={excluirTarefaSelecionada} editar={editarTarefa} concluir={concluirTarefaSelecionada}/>
        )
    }   
  }

  return (
    <>
      <Head>
        <title>Gerenciador de Tarefas</title>
        <meta name="description" content="Gerenciador de Tarefas" />
      </Head>
      <div className="flex flex-col  h-full min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-10">
        <div className="flex justify-start pl-8 pb-10 gap-5">
          <Botao cor="green" className="mb-4" onClick={() => setVisivel(1)}>Quadro Kanbam</Botao>
          <Botao cor="gray" className="mb-4" onClick={() => setVisivel(2)}>Gerenciar Equipe</Botao>
        </div>
        {renderLayout()}   
      </div>
    </>
  )  
}
import Tarefa from "../core/Tarefas";
import { useState, useEffect } from "react";

import TarefaRepositorio from "../core/TarefaRepositorio";
import ColecaoTarefa from "@/backend/db/ColecaoTarefas";

export default function useTarefas(){

    const [tarefa, setTarefa] = useState<Tarefa>();
    const [tarefas, setTarefas] = useState<Tarefa[]>([])

    const repo: TarefaRepositorio = new ColecaoTarefa();

    useEffect(obterTodos, [])

    function obterTodos(){
        repo.obterTodos().then(tarefas => {
            setTarefas(tarefas)
        });
    }

    function selecionarTarefa(tarefa){
        setTarefa(tarefa);
    }

    function mudarEstadoTarefa(tarefa: Tarefa, status: 'ATIVA' | 'CONCLUIDA' | 'EM ANDAMENTO'){
        tarefa.status = status;
        repo.salvar(tarefa);
        obterTodos();
    }

    async function excluirTarefa(tarefa: any){
        await repo.excluir(tarefa)
        obterTodos();
    }

    function novaTarefa(){
        setTarefa(new Tarefa('','','',new Date(),'',null,'ATIVA',null))
    }

    function concluirTarefa(tarefa: Tarefa){
        tarefa.status = 'CONCLUIDA';
        tarefa.dataConclusao = Date.now();
        repo.salvar(tarefa);
        obterTodos();
    }

    function selecionarUsuario(tarefa, nomeUsuario){
        tarefa.nomeResponsavel = nomeUsuario;
        salvarTarefa(tarefa);
        obterTodos();
    }

    async function salvarTarefa(tarefa: any){
        mapTarefa(tarefa);
        await repo.salvar(tarefa);
        obterTodos();
    }

    function mapTarefa(tarefa: any){
        if(!tarefa.id){
            tarefa.horaCriacao = Date.now();
        }
        if(tarefa.nomeResponsavel && tarefa.status == 'ATIVA'){
            tarefa.dataInicio = Date.now();
            tarefa.status = 'EM ANDAMENTO'
        }
    }

    async function obterPorId(id: string){
        await repo.obterPorId(id).then(tarefa => {
            setTarefa(tarefa)
        });
    }

    return{
        salvarTarefa,
        excluirTarefa,
        selecionarTarefa,
        selecionarUsuario,
        concluirTarefa,
        mudarEstadoTarefa,
        novaTarefa,
        obterTodos,
        obterPorId,
        tarefa,
        tarefas
    }
}
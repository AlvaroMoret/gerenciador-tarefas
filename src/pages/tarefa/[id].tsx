import { useRouter } from "next/router";
import Botao from "../../components/Botao";
import Link from "next/link";
import { useEffect } from "react";
import useTarefas from "@/src/hooks/useTarefas";
import useUsuario from "@/src/hooks/useUsuarios";

export default function VisaoTarefa(){
    const router = useRouter();
    const { id } = router.query;
    const { 
        selecionarTarefa,
        selecionarUsuario,
        excluirTarefa,
        concluirTarefa,
        obterPorId,
        tarefa
     } = useTarefas();

    const { usuarios } = useUsuario();

    useEffect(() => {
        obterPorId(id as string);
    });

    function getData(numData){
        let data = new Date(numData);
        let dataFormatada = data?.getDate() + '/' + (data?.getMonth() + 1) + '/' + data?.getFullYear() + ' - ' + data?.getHours() + ':' + data?.getMinutes();
        return dataFormatada;
    }

    function selecionou(event){
        selecionarUsuario(tarefa, event.target.value);
    }

    function renderTempoDiferente(){
        let dataInicio = new Date(tarefa?.dataInicio).getTime();
        let dataConclusao = new Date(tarefa?.dataConclusao).getTime();
        let tempoPrevisto = new Date(tarefa?.tempoPrevisto).getTime();
        let tempoGasto = dataConclusao - dataInicio;
        let tempoRestante = tempoPrevisto - dataInicio;
        let tempoDiferente = tempoRestante - tempoGasto;
        let tempoRestanteFormatado = getData(tempoDiferente);
        return (
            <>
                <h1>Data Conclusão: <span className={`pl-4 self-end`}>{getData(dataConclusao)}</span></h1>
                <h1>Tempo Gasto: <span className={`pl-4 self-end text-${tempoDiferente >= 0 ? 'green' : 'red'}-400`}>{tempoRestanteFormatado}</span></h1>
            </>
        )
    }


    function renderInput(){
        return (
            <select name='usuários' value={tarefa?.nomeResponsavel} className="bg-transparent w-2/5" onChange={selecionou}>
                {tarefa?.nomeResponsavel? false:<option value='' className="bg-black rounded-none">Ainda não Atribuído</option>}
                {
                    usuarios.map(usuario => {
                        return (
                            <option selected={tarefa?.nomeResponsavel == usuario.nome} key={usuario.id} value={usuario.nome} 
                            className="bg-black rounded-none">{usuario.nome}</option>
                        )
                    })
                }
            </select>
        )
    }

    return (
        <>
            <Link href='/'>
                <Botao cor="blue" className="m-6" onClick={()=> null}>Voltar</Botao>
            </Link>
            <div className="flex flex-col gap-4 w-10/12 m-auto bg-slate-600 p-8 rounded-lg">
                <div className="flex flex-col gap-2 font-mono pb-4 border-b-gray-800 border-b">
                    <h1 className="text-3xl font-bold">{tarefa?.nome}</h1>
                    <h1 className="cursor-pointer">Responsável: {renderInput()}</h1>
                    
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4 w-1/2 border-r-gray-800 border-r">
                        <h1>Status: 
                            <span className={`text-${tarefa?.status == 'ATIVA' ? 'red' : 
                                tarefa?.status == 'EM ANDAMENTO' ? 'blue' : 'green'}-400 pl-4`}>
                                {tarefa?.status}
                            </span>
                        </h1>
                        <h1>Descrição: <span className="pl-4">{tarefa?.descricao}</span></h1>
                    </div>
                    <div className="flex flex-col gap-4 w-3/5 pl-10">
                        <h1>hora da Criação: <span className="pl-4 self-end">{getData(tarefa?.horaCriacao)}</span></h1>
                        <h1>data de início: <span className="pl-4">{tarefa?.dataInicio ? getData(tarefa?.dataInicio) : 'Ainda não iniciado'}</span></h1>
                        {
                            tarefa?.status == 'CONCLUIDA' ?
                            renderTempoDiferente() :
                            <h1>Tempo Previsto: <span className="pl-4 self-end">{tarefa?.tempoPrevisto}</span></h1>
                        }
                    </div>
                </div>
                <Link href='/' className="w-fit self-end">
                    <Botao cor="red" className="m-6" onClick={()=> excluirTarefa(tarefa)}>Excluir</Botao>
                    <Botao cor="green" className="m-6" onClick={()=> selecionarTarefa(tarefa)}>Editar</Botao>
                    {tarefa?.status =='EM ANDAMENTO' ? 
                        <Botao cor="green" className="m-6" onClick={()=> concluirTarefa(tarefa)}>Concluir</Botao>: false
                    }
                </Link>
            </div> 
        </>
    )
}
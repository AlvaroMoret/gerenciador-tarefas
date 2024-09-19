import Botao from "./Botao";
import useUsuario from "@/src/hooks/useUsuarios";
import useTarefas from "../hooks/useTarefas";

export default function Informacoes(props: any){
    const { usuarios } = useUsuario();
    const { selecionarUsuario } = useTarefas();

    function getData(numData){
        let data = new Date(numData);
        let dataFormatada = data?.getDate() + '/' + (data?.getMonth() + 1) + '/' + data?.getFullYear() + ' - ' + data?.getHours() + ':' + data?.getMinutes();
        return dataFormatada;
    }

    
    function selecionou(event){
        selecionarUsuario(props.tarefa, event.target.value);
    }

    function renderTempoDiferente(){
        let dataConclusao = new Date(props.tarefa?.dataConclusao).getTime();
        let tempoPrevisto = new Date(props.tarefa?.tempoPrevisto).getTime();
        let tempoDiferente = tempoPrevisto - dataConclusao;
        let atraso = tempoDiferente < 0;
        tempoDiferente = Math.abs(tempoDiferente);
        let minutos  = ( tempoDiferente / 60000 ) % 60;     // 60000    = 60 * 1000
        let horas    = ( tempoDiferente / 3600000 ) % 24;   // 3600000  = 60 * 60 * 1000
        let dias     = tempoDiferente / 86400000            // 86400000 = 24 * 60 * 60 * 1000
        return (
            <>
                <h1>Data Conclusão: <span className={`pl-4 self-end`}>{getData(dataConclusao)}</span></h1>
                <h1>Tempo Previsto <span className={`pl-4 self-end`}>{getData(tempoPrevisto)}</span></h1>
                <h1>{
                        atraso ? 'Tempo de Atraso:' : 'Tempo Sobrando:' 
                    }
                    <span className={`pl-4 self-end text-${!atraso ? 'green' : 'red'}-400`}>{
                        dias >= 1 ? `${Math.floor(dias)} dias, ${Math.floor(horas)} horas e ${Math.floor(minutos)} minutos` :
                        horas >= 1 ? `${Math.floor(horas)} horas e ${Math.floor(minutos)} minutos` :
                        `${Math.floor(minutos)} minutos`
                    }</span>
                </h1>
            </>
        )
    }


    function renderInput(){
        return (
            <select name='usuários' value={props.tarefa?.nomeResponsavel} className="bg-transparent w-2/5" onChange={selecionou}>
                {props.tarefa?.nomeResponsavel? false:<option value='' className="bg-black rounded-none">Ainda não Atribuído</option>}
                {
                    usuarios.map(usuario => {
                        return (
                            <option selected={props.tarefa?.nomeResponsavel == usuario.nome} key={usuario.id} value={usuario.nome} 
                            className="bg-black rounded-none">{usuario.nome}</option>
                        )
                    })
                }
            </select>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-4 w-10/12 my-0 mx-auto bg-slate-600 p-8 rounded-lg">
                <div className="flex flex-col gap-2 font-mono pb-4 border-b-gray-800 border-b">
                    <h1 className="text-3xl font-bold">{props.tarefa?.nome}</h1>
                    <h1 className="cursor-pointer">Responsável: {renderInput()}</h1>
                    
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-4 w-1/2 border-r-gray-800 border-r">
                        <h1>Status: 
                            <span className={`text-${props.tarefa?.status == 'ATIVA' ? 'red' : 
                                props.tarefa?.status == 'EM ANDAMENTO' ? 'blue' : 'green'}-400 pl-4`}>
                                {props.tarefa?.status}
                            </span>
                        </h1>
                        <h1>Descrição: <span className="pl-4">{props.tarefa?.descricao}</span></h1>
                    </div>
                    <div className="flex flex-col gap-4 w-3/5 pl-10">
                        <h1>hora da Criação: <span className="pl-4 self-end">{getData(props.tarefa?.horaCriacao)}</span></h1>
                        <h1>data de início: <span className="pl-4">{props.tarefa?.dataInicio ? getData(props.tarefa?.dataInicio) : 'Ainda não iniciado'}</span></h1>
                        {
                            props.tarefa?.status == 'CONCLUIDA' ?
                            renderTempoDiferente() :
                            <h1>Tempo Previsto: <span className="pl-4 self-end">{getData(props.tarefa?.tempoPrevisto)}</span></h1>
                        }
                    </div>
                </div>
                <div className="w-fit self-end">
                    <Botao cor="red" className="m-6" onClick={()=> props.excluir?.(props.tarefa)}>Excluir</Botao>
                    <Botao cor="green" className="m-6" onClick={()=> props.editar?.(props.tarefa)}>Editar</Botao>
                    {props.tarefa?.status =='EM ANDAMENTO' ? 
                        <Botao cor="green" className="m-6" onClick={()=> props.concluir?.(props.tarefa)}>Concluir</Botao>: false
                    }
                </div>
            </div> 
        </>
    )
}
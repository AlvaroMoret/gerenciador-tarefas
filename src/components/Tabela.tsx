import { IconeEdicao, IconeLixo } from "./Icones"

interface TabelaProps{
  objeto: any[]
  objetoSelecionado?: (objeto:any)=>void
  objetoExcluido?: (objeto:any)=>void
}

export default function Tabela(props: TabelaProps){

  function renderCabecalho(){
    return(
      <tr>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Cargo</th>
        <th className="p-4">Ações</th>
      </tr>
    )
  }

  function renderAcoes(objeto: any){
    return(
      <th className="flex justify-center content-center">
        <button onClick={() => props.objetoSelecionado?.(objeto)} className={`flex justify-center items-center text-green-600 rounded-full p-2 m-1 hover:bg-purple-50`}>{IconeEdicao}</button> 
        <button onClick={() => props.objetoExcluido?.(objeto)} className={`flex justify-center items-center text-red-600 rounded-full p-2 m-1 hover:bg-purple-50`}>{IconeLixo}</button>
      </th>
    )
  }

  function renderDados(){
    return props.objeto?.map((objeto, i) =>{
      return(
        <tr key={objeto.id} className={`${i%2===0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
          <th className="text-center p-4">{objeto.nome}</th>
          <th className="text-center p-4">{objeto.cargo}</th>
          {renderAcoes(objeto)}
        </tr>
      )
    });
  }


  return(
    <table className="w-full rounded-xl overflow-hidden">
      <thead className={`text-gray-100 bg-gradient-to-r from-gray-900 to-black`}>
        {renderCabecalho()}
      </thead>
      <tbody>
        {renderDados()}
      </tbody>
    </table>
  )
}
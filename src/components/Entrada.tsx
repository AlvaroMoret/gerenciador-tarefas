interface EntradaProps{
  texto: string
  tipo?: 'text' | 'number'
  valor: any
  somenteLeitura: boolean
  valorMudou?: (valor: any) => void
}

export default function Entrada(props){
  return(
    <div className="flex flex-col mb-2">
      <label className="mb-4 font-bold">
        {props.texto}
      </label>
      <input 
        type={props.tipo ?? 'text'} 
        value={props.valor} 
        readOnly={props.somenteLeitura} 
        className={`border border-blue-500 rounded-lg 
                    focus: outline-none bg-gray-50 px-4 py-2
                    ${props.somenteLeitura ? '' : 'focus:bg-white'}
                    text-black`}
        onChange={e => props.valorMudou?.(e.target.value)}/>
    </div>
  )
}
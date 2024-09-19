import { IconeAdicao } from "./Icones";

interface LayoutProps{
  titulo: string,
  children: any,
  clickAdicao?: () => void;
}

export default function Layout(props: LayoutProps){

  function renderTitulo(titulo: string){
    return (
      <div className={`flex  flex-col justify-center`}>
        <div className={'flex justify-between'}>
          <h1 className="px-5 py-2 text-2xl">
            {titulo}
          </h1>
          {
            props.clickAdicao ?
            <button onClick={props.clickAdicao} className={`flex justify-center items-center rounded-full p-2 m-1 mr-8 hover:bg-black`}>{IconeAdicao}</button> :
            false
          }
        </div>
        <hr className="border-2 border-black"/>
      </div>
    )  
  }


  return (
    <div className={`flex flex-col w-fit bg-gray-600 
    text-gray-300 rounded-md self-center`}>
      {renderTitulo(props.titulo)}
      <div className="p-6">
        {props.children}
      </div>
    </div>
  )
}
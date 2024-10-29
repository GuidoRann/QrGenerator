import { useState } from 'react';
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'
import Modal from '../components/Modal';
import { ChevronsDown } from 'lucide-react'


export default function OurCreator() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ qrValue, setQrValue ] = useState<string>('')
  const [ qrImageUrl, setQrImageUrl ] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!qrValue) {
      return alert('Please enter a value')
    }

    const response = await QRCode.toDataURL(qrValue)
    setQrImageUrl(response)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQrImageUrl('')
  }

  return (
    <div className="flex flex-col h-screen w-screen items-center text-gray-300 bg-slate-800 font-Poppins">

        {/* Modal para mostrar el Codigo QR */}
      { qrImageUrl && <Modal isOpen={isModalOpen} onClose={handleCloseModal} qrImageUrl={qrImageUrl} /> }
      
        {/* Titulo de la página */}
      <div className="h-1/3 flex flex-col justify-center items-center">
        <h1 className="font-Lobster text-5xl font-black w-[85%] text-center">Creemos tu codigo QR</h1>
      </div>

        {/* Cuerpo de la página */}
      <div className="flex flex-col justify-center items-center h-1/3 font-bold">
        <div className="flex flex-col justify-center items-center pb-4">
          <p className="w-[90%]">El proceso es muy simple, agrega el Link, el texto o lo que quieras codificar aquí.</p>
          <ChevronsDown className="w-10 h-10"/>
        </div>
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2 w-[85%]">
          <input
            type="text"
            onChange={ ( event ) => setQrValue( event.target.value ) }
            placeholder="Inserta el contenido del codigo QR"
            className="w-full p-3 rounded-lg bg-slate-600 caret-secondary-color border border-gray-400 focus:border-primary-color focus:outline-none"
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            type="submit"
            className="flex justify-between p-3 items-center bg-primary-color hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium w-[80%]">Generar Código QR</button>
        </form>
      </div>

        {/* Boton para volver al inicio */}
       <div className="h-1/3 w-full flex justify-end items-end">
         <Link to="/" className="w-full flex justify-center p-3 items-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium">
            Volver al inicio
         </Link>
       </div>
    </div>
  )
}

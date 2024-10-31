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
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#1e293b] bg-[radial-gradient(#9333ea33_1px,#00091d_1px)] bg-[size:20px_20px] text-gray-300 font-Poppins">

        {/* Modal para mostrar el Codigo QR */}
      { qrImageUrl && <Modal isOpen={isModalOpen} onClose={handleCloseModal} qrImageUrl={qrImageUrl} /> }
      
        {/* Titulo de la página */}
      <div className="h-1/3 flex flex-col justify-center items-center">
        <h1 className="font-Lobster text-5xl font-black w-[85%] text-center">Vamos a crear tu código QR</h1>
      </div>

        {/* Cuerpo de la página */}
      <div className="flex flex-col justify-center items-center h-1/3 font-bold pt-24 lg:w-screen">
        <div className="flex flex-col justify-center items-center pb-4 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[50%]">
            <div className="flex flex-col justify-center items-center pb-4 lg:pb-8 lg:w-[70%] lg:text-xl">
              <p className="w-[90%] lg:w-full text-center lg:pb-4">El proceso es muy simple, agrega el Link, el texto o lo que quieras codificar aquí.</p>
              <ChevronsDown className="w-10 h-10"/>
            </div>
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-2 w-[85%]">
              <input
                type="text"
                onChange={ ( event ) => setQrValue( event.target.value ) }
                placeholder="Inserta el contenido del codigo QR"
                className="w-full p-3 rounded-lg bg-slate-600 caret-secondary-color border border-gray-400 focus:border-primary-color focus:outline-none"/>
              <button 
                onClick={() => setIsModalOpen(true)}
                type="submit"
                className="flex justify-between p-3 items-center bg-primary-color hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium w-[80%]">Generar Código QR</button>
            </form>
        </div>
      </div>

        {/* Boton para volver al inicio */}
       <div className="h-1/3 w-full flex justify-end items-end lg:justify-center">
         <Link to="/" className="w-full lg:w-1/3 flex justify-center p-3 items-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium">
            Volver al inicio
         </Link>
       </div>
    </div>
  )
}

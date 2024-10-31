import { ChevronsDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import QrScanner from 'qr-scanner';

export default function OurReader() {
  const [file, setFile] = useState< File | null >( null );
  const [data , setData] = useState< string >( '' );
  const fileRef = useRef< HTMLInputElement >( null );

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) { 
      setFile(file);
      const result = QrScanner.scanImage(file, { returnDetailedScanResult: true })

      result.then((result) => {
        setData(result.data)
      })
    }
  };

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#1e293b] bg-[radial-gradient(#9333ea33_1px,#00091d_1px)] bg-[size:20px_20px] text-gray-300 font-Poppins">

        {/* Titulo de la página */}
      <div className="h-2/6 flex flex-col justify-center items-center">
        <h1 className="font-Lobster text-5xl font-black w-[85%] text-center">Vamos a leer tu código QR</h1>
      </div>

        {/* Cuerpo de la página */}
        <div className="flex flex-col justify-center items-center h-1/6 font-bold pt-24 lg:w-screen">
          <div className="flex flex-col justify-center items-center pb-4 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-[50%]">
              <div className="flex flex-col justify-center items-center pb-4 lg:pb-8 lg:w-[70%] lg:text-xl">
            <p className="w-[90%] lg:w-full text-center lg:pb-4">Toca en el botón y selecciona la imagen de tu dispositivo con el código QR que deseas leer.</p>
            <ChevronsDown className="w-10 h-10"/>
          </div>
            <button 
              onClick={handleClick}
              className="flex justify-center p-3 items-center bg-primary-color hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium w-[80%]">Leer Código QR
            </button>
            <input
              ref={fileRef}
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="hidden"/>
        </div>
      </div>

        {/* Resultado del escaneo del codigo */}
      <div className="flex flex-col justify-center items-center h-2/6 text-center pt-12 px-4">
        {
          file && (
            <>
              {/^https?:\/\//.test(data) ? (
                <a href={data} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline hover:text-blue-500 "> 
                  <p className="flex flex-col justify-center items-center p-6 gap-3 bg-slate-600 bg-opacity-35 rounded-2xl">{data}</p>
                </a>
              ) : (
                <p className="flex flex-col justify-center items-center p-6 gap-3 bg-slate-600 bg-opacity-35 rounded-2xl">{data}</p>
              )}
            </>
          )
        }
      </div>

        {/* Boton para volver al inicio */}
       <div className="h-1/6 w-full flex justify-end items-end lg:justify-center">
         <Link to="/" className="w-full lg:w-1/3 flex justify-center p-3 items-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium">
            Volver al inicio
         </Link>
       </div>
    </div>
  )
}

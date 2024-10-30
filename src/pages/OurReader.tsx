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
    <div className="flex flex-col h-screen w-screen items-center text-gray-300 bg-slate-800 font-Poppins">

        {/* Titulo de la página */}
      <div className="h-1/3 flex flex-col justify-center items-center">
        <h1 className="font-Lobster text-5xl font-black w-[85%] text-center">Leemos tu QR</h1>
      </div>

        {/* Cuerpo de la página */}
      <div className="flex flex-col justify-center items-center h-1/3 font-bold">
        <div className="flex flex-col justify-center items-center pb-5">
          <p className="w-[90%] text-center">Toca en el botón y selecciona la imagen de tu dispositivo con el código QR que deseas leer.</p>
          <ChevronsDown className="w-8 h-8"/>
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
            className="hidden"
          />
      </div>

        {/* Resultado del escaneo del codigo */}
      <div className="text-center">
        {
          file && (
            <>
              {/^https?:\/\//.test(data) ? (
                <a href={data} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline hover:text-blue-500">{data}</a>
              ) : (
                <p>{data}</p>
              )}
            </>
          )
        }
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

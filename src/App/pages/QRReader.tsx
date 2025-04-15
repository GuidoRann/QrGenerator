import { ArrowLeft, ChevronDown, Monitor, ScanLine, Smartphone } from 'lucide-react';
import ReaderModal from '../pagesComponents/ReaderModal';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QrScanner from 'qr-scanner';

export default function QRReader() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
  
        result.then(( result ) => {
          setData( result.data )
          setIsModalOpen( true );
        })

        event.target.value = '';
      }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    }

    const qrDataEntry = {
      url: data,
      title: "Mi Código QR",
      description: "Este es el resultado de tu codigo QR"
    }


  return (
    <div className='min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center justify-between p-4 sm:p-6 w-full font-primary'>
      
      {/* Modal to display the QR Code */}
      { file && <ReaderModal isOpen={isModalOpen} onClose={handleCloseModal} qrData={qrDataEntry}/> }
            
      {/* Light effects resembling descending rays */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-40 md:w-64 h-[30vh] bg-gradient-to-b from-indigo-500/40 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 left-1/4 transform -translate-x-1/2 w-20 md:w-40 h-[25vh] bg-gradient-to-b from-purple-500/30 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 right-1/4 transform translate-x-1/2 w-20 md:w-40 h-[25vh] bg-gradient-to-b from-purple-500/30 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 left-[10%] w-12 md:w-24 h-[15vh] bg-gradient-to-b from-indigo-500/20 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 right-[10%] w-12 md:w-24 h-[15vh] bg-gradient-to-b from-indigo-500/20 to-transparent rounded-b-full blur-xl'></div>
      </div>

      {/* Main container - responsive with adjusted layout */}
      <div className='w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-12 z-10 pt-8 lg:pt-0'>
        
        {/* Title section - aligned to the left on desktop */}
        <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-6 mb-8 lg:mb-0'>
          <div className='flex items-center gap-3 mb-2'>
            <ScanLine className='w-8 h-8 text-purple-300' />
          </div>

          <div className='text-center lg:text-left py-5 pb-12 md:py-0 md:pb-0'>
            <h1 className='text-4xl lg:text-5xl font-bold mb-4'>
              <span className='text-purple-300'>Vamos a leer</span>
              <br />
              tu código QR
            </h1>

            <p className='text-gray-300 max-w-md'>
              Selecciona una imagen con un código QR desde tu dispositivo y obtendrás al instante la información
              contenida en él.
            </p>
          </div>

          {/* QR Image placeholder - only visible on desktop */}
          <div className='hidden lg:flex flex-col items-center justify-center mt-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 w-64 h-64'>
            <ScanLine className='w-32 h-32 text-purple-300' strokeWidth={1} />
          </div>
        </div>

        {/* Scanner section - aligned to the right on desktop */}
        <div className='w-full lg:w-1/2 bg-[#252542] rounded-xl p-6 border-l-4 border-purple-500 shadow-md md:py-12'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-semibold text-purple-300'>Lector de QR</h2>
            <div className='flex items-center gap-2'>
              <Smartphone className='w-5 h-5 text-gray-400' />
              <span className='hidden sm:inline text-gray-400 text-sm'>|</span>
              <Monitor className='w-5 h-5 text-gray-400' />
            </div>
          </div>
          <div className='flex-1 flex flex-col items-center justify-center text-center'>
            <p className='text-lg text-gray-400 mb-4 py-2'>
              Toca en el botón y selecciona la imagen de tu dispositivo con el código QR que deseas leer.
            </p>

            <ChevronDown className='w-8 h-8 text-indigo-300 mb-8 animate-bounce' />

              <div className='w-full max-w-md space-y-6'>
                <Button size='lg' variant='primaryCode' className='h-14 w-full rounded-2xl' onClick={ handleClick }>
                  Leer Código QR
                </Button>
                <input type="file" ref={fileRef} onChange={ handleChange } accept="image/*" className="hidden" />
              </div>
          </div>
        </div>
      </div>
      
      {/* Button to go back / responsive adaptation */}
      <Button
        variant='ghost'
        className='mt-8 w-full max-w-md mx-auto text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg py-3 flex items-center justify-center gap-2'>
        <ArrowLeft className='w-4 h-4' />
        <Link to='/'>
           Volver al inicio
        </Link>
      </Button>
    </div>
  );
}

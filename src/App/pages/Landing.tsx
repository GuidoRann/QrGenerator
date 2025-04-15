import {QrCode, ScanLine, ArrowRight, Check} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import Footer from "../pagesComponents/Footer";

export default function MainLandingPage() {
  return (
    <div className='min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center justify-between p-4 sm:p-6 w-full relative overflow-hidden font-primary'>
      
      {/* Light effects descending rays */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-40 md:w-64 h-[30vh] bg-gradient-to-b from-purple-500/40 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 left-1/4 transform -translate-x-1/2 w-20 md:w-40 h-[25vh] bg-gradient-to-b from-pink-500/30 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 right-1/4 transform translate-x-1/2 w-20 md:w-40 h-[25vh] bg-gradient-to-b from-purple-500/30 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 left-[10%] w-12 md:w-24 h-[15vh] bg-gradient-to-b from-indigo-500/20 to-transparent rounded-b-full blur-xl'></div>
        <div className='absolute top-0 right-[10%] w-12 md:w-24 h-[15vh] bg-gradient-to-b from-indigo-500/20 to-transparent rounded-b-full blur-xl'></div>
      </div>

      {/* Main container - responsive layout */}
      <div className='w-full max-w-6xl mx-auto z-10 py-12 '>
        
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r font-secondary from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent'>
            Hola Conectando QR!
          </h1>
          <div className='h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto'></div>
        </div>

        {/* Main feature cards */}
        <div className='grid md:grid-cols-2 gap-8 mb-20'>
          
          {/* Card 1: Generate QR */}
          <div className='bg-[#252542] rounded-xl p-6 border-l-4 border-purple-500 shadow-md'>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-[#1a1a2e] p-4 rounded-full mb-4 border border-purple-500/30'>
                <QrCode className='w-12 h-12 text-purple-400' />
              </div>
              <h2 className='text-2xl font-bold mb-3 text-purple-300'>Crea tu código QR</h2>
              <p className='text-gray-300 mb-6'>
                Genera códigos QR personalizados para tus enlaces, textos o información de contacto.
              </p>
              <Link to='/generator' className='w-full'>
                <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-600/30 transition-all'>
                  <span>Crear tu propio QR</span>
                  <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Read QR */}
          <div className='bg-[#252542] rounded-xl p-6 border-l-4 border-purple-500 shadow-md'>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-[#1a1a2e] p-4 rounded-full mb-4 border border-purple-500/30'>
                <ScanLine className='w-12 h-12 text-purple-400' />
              </div>
              <h2 className='text-2xl font-bold mb-3 text-purple-300'>Lee el código QR de una imagen</h2>
              <p className='text-gray-300 mb-6'>
                Lee lo que tiene tu código QR desde una imagen sin necesidad de escanearlo con otro dispositivo.
              </p>
              <Link to='/reader' className='w-full'>
                <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-600/30 transition-all'>
                  <span>Leer tu código QR</span>
                  <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <div className='mb-16'>
          <h2 className='text-3xl font-bold text-center mb-10 text-teal-400'>¿Por qué elegir Conectando QR?</h2>

          <div className='grid md:grid-cols-3 gap-6'>
            {/* Benefit 1 */}
            <div className='bg-[#1e1e36] rounded-xl p-6 border-t-2 border-teal-500'>
              <div className='flex flex-col items-center text-center'>
                <div className='bg-[#1a1a2e] p-3 rounded-full mb-4'>
                  <Check className='w-8 h-8 text-teal-400' />
                </div>
                <h3 className='text-xl font-bold mb-3 text-teal-300'>Fácil de usar</h3>
                <p className='text-gray-300'>Interfaz intuitiva para crear y leer códigos QR sin complicaciones.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className='bg-[#1e1e36] rounded-xl p-6 border-t-2 border-teal-500'>
              <div className='flex flex-col items-center text-center'>
                <div className='bg-[#1a1a2e] p-3 rounded-full mb-4'>
                  <Check className='w-8 h-8 text-teal-400' />
                </div>
                <h3 className='text-xl font-bold mb-3 text-teal-300'>Rápido y eficiente</h3>
                <p className='text-gray-300'>Genera y escanea códigos QR en segundos con alta precisión.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className='bg-[#1e1e36] rounded-xl p-6 border-t-2 border-teal-500'>
              <div className='flex flex-col items-center text-center'>
                <div className='bg-[#1a1a2e] p-3 rounded-full mb-4'>
                  <Check className='w-8 h-8 text-teal-400' />
                </div>
                <h3 className='text-xl font-bold mb-3 text-teal-300'>Versátil</h3>
                <p className='text-gray-300'>Crea códigos QR para URLs, texto, contactos y más.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

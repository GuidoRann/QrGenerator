import { ArrowRight, CheckCircle, QrCode, ScanQrCode } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Landing() {
  return (
    <div className="flex flex-col justify-between text-gray-300">
      <Header />
        <h1 className="text-4xl font-black pt-14 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 text-center px-5">Hola Conectando QR!</h1>
      <div className="flex flex-col justify-center items-center py-14 px-5">

        {/* QR Creator and reader section  */}
        <section className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center p-6 gap-3 bg-slate-600 bg-opacity-35 rounded-2xl ">
            <QrCode className="w-12 h-12 text-purple-400 mb-4" />
            <h1>Crea tu código QR</h1>
            <p className="pb-4">Genera códigos QR personalizados para tus enlaces, textos o información de contacto.</p>
            <button className="w-full flex justify-between p-3 items-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-xl">
              Crear tu propio QR <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col justify-between items-center p-6 gap-3 bg-slate-600 bg-opacity-35 rounded-2xl ">
            <ScanQrCode className="w-12 h-12 text-purple-400 mb-4" />
            <h1>Lee el codigo QR de una imagen</h1>
            <p className="pb-4">Genera códigos QR personalizados para tus enlaces, textos o información de contacto.</p>
            <button className="w-full flex justify-between p-3 items-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-xl">
              Leer tu código QR <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </section>
       
        {/* Cards info section */}
        <section className="text-center mb-16 pt-14">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">¿Por qué elegir Conectando QR?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Fácil de usar", desc: "Interfaz intuitiva para crear y leer códigos QR sin complicaciones." },
                { title: "Rápido y eficiente", desc: "Genera y escanea códigos QR en segundos con alta precisión." },
                { title: "Versátil", desc: "Crea códigos QR para URLs, texto, contactos y más." }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-gray-600 bg-opacity-50 rounded-lg backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                  <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p >{feature.desc}</p>
                </div>
              ))}
            </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

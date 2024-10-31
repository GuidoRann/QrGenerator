import { ArrowRight, CheckCircle, QrCode, ScanQrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#1e293b] bg-[radial-gradient(#9333ea33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="flex flex-col justify-between items-center text-gray-200 font-Poppins h-screen overflow-y-auto">
        <h1 className="font-Lobster text-5xl font-black w-[85%] pt-14 bg-clip-text text-transparent bg-gradient-to-r from-secondary-color to-pink-600 text-center px-5">
          Hola Conectando Qr!
        </h1>
        <div className="flex flex-col justify-center items-center py-14 px-5">

          {/* Sección de creación y lectura de QR */}
          <section className="flex flex-col justify-center items-center gap-4 lg:flex-row lg:gap-20">
            <div className="flex flex-col justify-center items-center p-6 gap-3 bg-slate-600 bg-opacity-35 rounded-2xl lg:max-w-md">
              <QrCode className="w-20 h-20 text-secondary-color mb-4" />
              <h1 className="font-bold text-lg">Crea tu código QR</h1>
              <p className="pb-4 text-gray-400">
                Genera códigos QR personalizados para tus enlaces, textos o información de contacto.
              </p>
              <Link
                to="/creator"
                className="w-full flex justify-between p-3 items-center bg-primary-color hover:bg-hover-color transition-colors duration-300 rounded-xl font-medium"
              >
                Crear tu propio QR <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="flex flex-col justify-between items-center p-6 gap-3 bg-slate-600 bg-opacity-35 rounded-2xl lg:max-w-md">
              <ScanQrCode className="w-20 h-20 text-secondary-color mb-4" />
              <h1 className="font-bold text-lg">Lee el código QR de una imagen</h1>
              <p className="pb-4 text-gray-400">
                Lee lo que tiene tu código QR desde una imagen sin necesidad de escanearlo con otro dispositivo.
              </p>
              <Link
                to="/reader"
                className="w-full flex justify-between p-3 items-center bg-primary-color hover:bg-hover-color transition-colors duration-300 rounded-xl font-medium"
              >
                Leer tu código QR <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </section>

          {/* Sección de información */}
          <section className="text-center mb-16 pt-14">
            <h2 className="text-3xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              ¿Por qué elegir Conectando QR?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Fácil de usar", desc: "Interfaz intuitiva para crear y leer códigos QR sin complicaciones." },
                { title: "Rápido y eficiente", desc: "Genera y escanea códigos QR en segundos con alta precisión." },
                { title: "Versátil", desc: "Crea códigos QR para URLs, texto, contactos y más." },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-gray-600 bg-opacity-50 rounded-lg backdrop-blur-sm hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
                >
                  <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
        <Footer />
      </div>
    </div>
  )
}

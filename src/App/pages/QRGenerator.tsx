import { useState } from "react"
import { ArrowLeft, Smartphone, Monitor, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from 'react-router-dom';
import QRCode from 'qrcode'
import QrModal from '../pagesComponents/QrModal';
import { CustomAlert } from '../pagesComponents/CustomAlert';

export default function QRGenerator() {
  const [activeTab, setActiveTab] = useState("url")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [ qrValue, setQrValue ] = useState<string>('')
    const [ qrImageUrl, setQrImageUrl ] = useState<string>('')
    
    const [alertOpen, setAlertOpen] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      
      if (!qrValue) {
        setAlertOpen(true)
        return
      }
  
      const response = await QRCode.toDataURL(qrValue, {
        width: 512,
        margin: 2,
      })
      setQrImageUrl(response)
    }
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setQrImageUrl('')
    }
  
    const qrDataEntry = {
      url: qrValue,
      title: "Mi Código QR",
      description: "Escanea este código para acceder a contenido exclusivo",
      imageUrl: qrImageUrl,
    }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white flex flex-col items-center justify-between p-4 sm:p-6 w-full font-primary">

      {/* Modal to display the QR Code */}
      { qrImageUrl && <QrModal isOpen={isModalOpen} onClose={handleCloseModal} qrData={qrDataEntry} /> }
      
      <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-5 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-20 left-1/3 w-24 h-24 bg-pink-500/20 rounded-full blur-xl"></div>
      </div>

      {/* Main container - responsive layout */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:gap-12 z-10 pt-8 lg:pt-0">
        
        {/* Title section - To left in desktop */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-6 mb-8 lg:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <QrCode className="w-8 h-8 text-purple-500" />
          </div>

          <div className="text-center lg:text-left py-5 pb-12 md:py-0 md:pb-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-purple-300 ">Vamos a crear</span>
              <br />
              tu código QR
            </h1>

            <p className="text-gray-300 max-w-md">
              El proceso es muy simple, agrega el Link, el texto o lo que quieras codificar. Genera códigos QR para
              cualquier propósito de manera rápida y sencilla.
            </p>
          </div>

          {/* Qr reference - hidden in mobile */}
          <div className="hidden lg:flex flex-col items-center justify-center mt-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 w-64 h-64">
            <QrCode className="w-32 h-32 text-purple-300" strokeWidth={1} />
          </div>
        </div>

        {/* Form section - To right in desktop */}
        <div className="w-full lg:w-1/2 bg-[#252542] rounded-xl p-6 border-l-4 border-purple-500 shadow-md md:py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-purple-300">Generador de QR</h2>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <span className="hidden sm:inline text-gray-400 text-sm">|</span>
              <Monitor className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="url" className="mb-6">
              <TabsList className="w-full bg-[#f5f5f5] text-xl">
                <TabsTrigger value="url" onClick={() => setActiveTab("url")} className="flex-1 data-[state=active]:bg-primary-color data-[state=active]:text-[#f5f5f5] text-zinc-500">
                  URL
                </TabsTrigger>
                <TabsTrigger value="text" onClick={() => setActiveTab("text")} className="flex-1 data-[state=active]:bg-primary-color data-[state=active]:text-[#f5f5f5] text-zinc-500">
                  Texto
                </TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="mt-2">
                <p className="text-lg text-gray-400 mb-4">Ingresa la URL que deseas convertir en código QR</p>
              </TabsContent>
              <TabsContent value="text" className="mt-2">
                <p className="text-lg text-gray-400 mb-4">Ingresa el texto que deseas convertir en código QR</p>
              </TabsContent>
            </Tabs>

            <div className="w-full space-y-12">
              <div className="space-y-2">
                <label htmlFor="qr-input" className="text-md text-gray-300">
                  <div className="py-1">
                    {activeTab === "url" ? "URL" : activeTab === "text" ? "Texto" : "Información de contacto"}
                  </div>
                </label>
                <Input
                  type="text"
                  onChange={ ( event ) => setQrValue( event.target.value )}
                  placeholder={activeTab === "url" ? "https://ejemplo.com" : "Tu texto aquí"}
                  className="bg-gray-800 border-gray-700 rounded-lg p-6 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <Button size="lg" variant="primaryCode" className="h-14 w-full rounded-2xl" onClick={ () =>  setIsModalOpen( true ) }>
                Generar Código QR
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Error alert mobile and web */}
      <CustomAlert
              title="Campo requerido"
              message="Por favor ingresa un valor"
              isOpen={ alertOpen }
              onClose={ () => setAlertOpen( false ) }
       />

      {/* Button to go back / responsive adaptation */}
      <Button
        variant="ghost"
        className="mt-8 w-full max-w-md mx-auto text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg py-3 flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <Link to="/">
            Volver al inicio
         </Link>
      </Button>
    </div>
  )
}

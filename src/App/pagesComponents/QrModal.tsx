import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Share2, Info } from "lucide-react"
import { useMediaQuery } from '@/components/hooks/useMediaQuery';


interface QRCodeData {
  url: string
  title: string
  description: string
  imageUrl: string
}

interface QRModalProps {
  qrData: QRCodeData
  isOpen: boolean
  onClose: () => void
}

export default function QRModal({ qrData, isOpen, onClose }: QRModalProps) {

  const [qrNameValue, setQrNameValue] = useState('');

  const [activeTab, setActiveTab] = useState("code")
  const isMobile = useMediaQuery("(max-width: 768px)")

  if(qrNameValue === '') setQrNameValue('Mi Código QR')

    const handleShareQRImage = async () => {
      if (!qrData.imageUrl) return;
    
      const res = await fetch(qrData.imageUrl);
      const blob = await res.blob();
    
      const file = new File([blob], `${qrNameValue}.png`, { type: "image/png" });
    
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Código QR",
            text: "¡Mirá este código QR!",
          });
        } catch (error) {
          console.error("Error al compartir:", error);
        }
      } else {
        alert("Tu dispositivo no permite compartir imágenes.");
      }
    };
    

  // Shared content between mobile and desktop
  const QRCodeContent = (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border flex items-center justify-center">
      <img
        src={qrData.imageUrl || "/placeholder.svg?height=250&width=250"}
        alt="Código QR"
        width={250}
        height={250}
        className="object-contain"
      />
    </div>
  )

  const InfoContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium flex items-center gap-2">
          <Info className="h-4 w-4 text-[#f5f5f5]" />
          Enlace
        </h3>
        <p className="text-sm text-zinc-300 break-all p-3 rounded bg-[#0f1c33]">
          {qrData.url || "https://ejemplo.com/tu-enlace"}
        </p>
      </div>

      <div className="space-y-2 text-[#f5f5f5]">
        <h3 className="font-medium">Instrucciones</h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-[#061124] rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 text-[#f5f5f5]">
              1
            </span>
            <span>Apunta la cámara de tu dispositivo al código QR</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-[#061124] rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 text-[#f5f5f5]">
              2
            </span>
            <span>Espera a que se reconozca automáticamente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-[#061124] rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 text-[#f5f5f5]">
              3
            </span>
            <span>Accede al contenido vinculado</span>
          </li>
        </ul>
      </div>

      <div className="space-y-2 pt-3">
        <h3 className="font-medium flex items-center gap-2">Ingresa el nombre de tu QR</h3>
        <input
          type="text"
          placeholder="Aqui el nombre"
          className="w-full p-3 rounded-md bg-[#0f1c33] text-[#f5f5f5]"
          onChange={(e) => setQrNameValue(e.target.value)}
        />
      </div>
    </div>
  )

  // Mobile version using Drawer
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[80vh] min-h-[73vh] font-primary bg-[#1a1a2e] border-zinc-800 text-[#f5f5f5] rounded-4xl">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-xl font-bold flex items-center justify-center gap-2 text-[#f5f5f5]">
              <QrCode className="h-5 w-5 text-primary-color" />
              {qrData.title || "Tu código QR"}
            </DrawerTitle>
            <DrawerDescription>
              {qrData.description || "Escanea este código para acceder al contenido"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4">
            <Tabs defaultValue="code" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#f5f5f5]">
                <TabsTrigger 
                  value="code" 
                  className="data-[state=active]:bg-primary-color data-[state=active]:text-[#f5f5f5] text-zinc-500">Código QR
                </TabsTrigger>
                <TabsTrigger 
                  value="info"
                  className="data-[state=active]:bg-primary-color data-[state=active]:text-[#f5f5f5] text-zinc-500">Información
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="flex justify-center py-4">
                {QRCodeContent}
              </TabsContent>

              <TabsContent value="info" className="py-2">
                {InfoContent}
              </TabsContent>
            </Tabs>
          </div>

          <DrawerFooter className="px-4 pt-2 pb-6">
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="primaryCode" size="lg" className="h-14">
                <a href={qrData.imageUrl} download={ qrNameValue }>
                  <Download className="mr-2 h-5 w-5" />
                  Descargar
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="h-14" onClick={ handleShareQRImage }>
                <Share2 className="mr-2 h-5 w-5" />
                Compartir
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" className="mt-8 w-full max-w-md mx-auto text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-lg py-3 flex items-center justify-center gap-2 text-md">
                Cerrar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  // Desktop version using Dialog
  return (
    <Dialog open={ isOpen } onOpenChange={ onClose }>
      <DialogContent className="sm:max-w-md md:max-w-2xl font-primary bg-[#1e293b] border-zinc-800 text-[#f5f5f5]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary-color" />
            {qrData.title || "Tu código QR"}
          </DialogTitle>
          <DialogDescription>{qrData.description || "Escanea este código para acceder al contenido"}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="code" className="w-full " onValueChange={ setActiveTab } value={ activeTab }>
          
          <TabsList className="flex justify-center w-full mb-4 bg-primary-color">
            <TabsTrigger value="code" className="">Código QR</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="py-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex justify-center flex-1">{ QRCodeContent }</div>
              <div className="flex-1 hidden md:block">{ InfoContent }</div>
            </div>
          </TabsContent>

        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button asChild variant="primaryCode" size="lg" className="h-14">
            <a href={ qrData.imageUrl } download={ qrNameValue }>
              <Download className="mr-2 h-4 w-4"/>
              Descargar
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

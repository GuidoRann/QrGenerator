import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { QrCode, Info } from "lucide-react"
import { useMediaQuery } from '@/components/hooks/useMediaQuery';


interface QRCodeData {
  url: string
  title: string
  description: string
}

interface QRModalProps {
  qrData: QRCodeData
  isOpen: boolean
  onClose: () => void
}

export default function ReaderModal({ qrData, isOpen, onClose }: QRModalProps) {

  const [activeTab, setActiveTab] = useState("code")
  const isMobile = useMediaQuery("(max-width: 768px)")

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  const isUrl = isValidUrl(qrData.url);

  const InfoContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium flex items-center gap-2">
          <Info className="h-4 w-4 text-[#f5f5f5]" />
          Enlace
        </h3>
        
        {isUrl ? (
        <a
          href={qrData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-blue-400 break-all p-3 rounded bg-[#0f1c33] hover:underline"
        >
          {qrData.url}
        </a>
      ) : (
        <p className="text-sm text-zinc-300 break-all p-3 rounded bg-[#0f1c33]">
          {qrData.url || "https://ejemplo.com/tu-enlace"}
        </p>
      )}
        
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
            <Tabs defaultValue="code" className="w-full" onValueChange={ setActiveTab } value={activeTab}>
              
              <TabsList className="flex justify-center w-full mb-4 bg-[#f5f5f5]">
                <TabsTrigger 
                  value="code" 
                  className="data-[state=active]:bg-primary-color data-[state=active]:text-[#f5f5f5] text-zinc-500">Resultado código QR
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="py-2">
                {InfoContent}
              </TabsContent>

            </Tabs>
          </div>

          <DrawerFooter className="px-4 pt-2 pb-6">
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
              <div className="flex-1 hidden md:block">{ InfoContent }</div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

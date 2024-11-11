import { X } from 'lucide-react'

interface modalProps {
  qrImageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose, qrImageUrl }: modalProps) {
  return (
    <>
    {isOpen && (
      <div className="animate-fade-in animate-duration-300 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center text-gray-200">
        <section className="bg-slate-800 lg:w-[30%] w-[90%] flex flex-col items-center rounded-xl">
        <button className="w-full flex justify-end px-2 py-3 font-black" onClick={onClose}><X size={25}/></button>
          <img className="w-[84%] rounded-[30px]" src={qrImageUrl} alt="QR Code" />
          <div className="py-4">
            <button
              className="flex justify-center bg-primary-color hover:bg-secondary-color px-12 py-3 md:px-7 md:py-3 cursor-pointer rounded-xl font-medium hover:scale-110 duration-300"
              onClick={onClose}
            >
              <a href={qrImageUrl} download="qr-code">Descargar QR</a>
            </button>
          </div>
        </section>
      </div>
    )}
  </>
  )
}

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OurReader() {

  return (
    <div className="flex flex-col h-screen w-screen justify-between items-center text-gray-300 bg-slate-800 font-Poppins">
      <h1>Lector</h1>
      <form className="flex flex-col justify-center items-center gap-4 w-[85%]">
        <input
          type="text"
          placeholder="Escribe tu texto"
          className="w-full p-3 rounded-lg bg-slate-600"
        />
        <button 
        type="submit"
        className="flex justify-between p-3 items-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium w-[80%]">Leer Código QR</button>
      </form>
      <Link to="/" className="w-full flex justify-between p-3 items-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-xl font-medium">
        Volver al inicio
      </Link>
    </div>
  )
}

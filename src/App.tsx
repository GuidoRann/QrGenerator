import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './App/pages/Landing';
import QRGenerator from './App/pages/QRGenerator';
import QRReader from './App/pages/QRReader';


function App() {

  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Landing />} />
        <Route path="/generator" element={<QRGenerator />} />
        <Route path="/reader" element={<QRReader />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import Landing from './pages/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OurCreator from './pages/OurCreator';
import OurReader from './pages/OurReader';


function App() {

  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Landing />} />
        <Route path="/creator" element={<OurCreator />} />
        <Route path="/reader" element={<OurReader />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

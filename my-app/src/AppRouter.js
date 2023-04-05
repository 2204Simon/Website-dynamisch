import { BrowserRouter, Route, Routes } from 'react-router-dom';
import APP from './App.js';
// import Produkte from './Produkte';
// import Bestellung from './Bestellung';
// import UnsereGeschichte from './UnsereGeschichte';
// import Kontakt from './Kontakt';
import Test from './test.js'
import App from './App.js';
// import App from './App.js';

function AppRouter() {
  return (  
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<p>default</p>}>
    //         <Route index element={<p>index</p>} />
    //         <Route path="/my-app/Produkte.html" element={<p>Produkte</p>} />
    //         <Route path="/Bestellung.html" element={<p>Bestellung</p>} />
    //         <Route path="/Unsere_Geschichte.html" element={<p>Unsere Geschichte</p>} />
    //         <Route path="/Kontakt.html" element={<p>Kontakt</p>} />
    //         <Route path="*" element={<p>Fehlerseite</p>} /> {/* Fehler Seite */}
            
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<p>default</p>}>
      <Route index element={<p>index</p>} />
      <Route path="/Produkte.html" element={<p>Produkte</p>} />
      <Route path="/Bestellung" element={<p>Bestellung</p>} />
      <Route path="/Unsere_Geschichte.html" element={<p>Unsere Geschichte</p>} />
      <Route path="/Kontakt.html" element={<p>Kontakt</p>} />
      <Route path="*" element={<p>Fehlerseite</p> } />
    </Route>
  </Routes>
</BrowserRouter>
    );
  }

export default AppRouter;
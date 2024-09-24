import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cotizador from "./components/Cotizador";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cotizador></Cotizador>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

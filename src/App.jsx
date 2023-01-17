import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockDetailPage } from "./pages/StockDetailPage";
import { StockOverviewPage } from "./pages/StockOverviewPage";
import "./App.css";

export default function App() {
  return (
    <main className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StockOverviewPage />} />
          <Route path='/detail/:symbol' element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

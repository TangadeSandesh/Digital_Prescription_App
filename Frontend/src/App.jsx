import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Prescribe from './pages/Prescribe';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-grow w-full container mx-auto px-2 sm:px-4 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/prescribe" element={<Prescribe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <ToastContainer position="top-center" autoClose={1500} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

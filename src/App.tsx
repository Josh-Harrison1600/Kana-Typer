import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import Game from './pages/Game';
import NavBar from './components/NavBar';
import Footer from './components/footer';

function App() {
  return (
    <>
      <div className='bg-[#090909] min-h-screen'>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

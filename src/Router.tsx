import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Game from './components/Game';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

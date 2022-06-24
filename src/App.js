import { Routes, Route } from 'react-router-dom';
import './App.css';
import Info from './components/Info';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Info />} />
      </Routes>
    </div>
  );
}

export default App;

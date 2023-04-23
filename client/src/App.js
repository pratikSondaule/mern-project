import { Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import Home from './component/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      
    </div>
  );
}

export default App;

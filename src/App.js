import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Cadastro from './components/Cadastro';
import Leads from './components/Leads'; 

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/leads" element={<Leads />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

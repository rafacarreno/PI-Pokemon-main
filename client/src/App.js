import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/createPokemon' element={<CreatePokemon/>}/>
          <Route path='*' element={<h1>HTTP 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

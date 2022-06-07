import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';
import PokemonDetail from './components/PokemonDetail';
import NotFoundPage from './components/NotFoundPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/home/:id' element={<PokemonDetail />} />
          <Route path='/createPokemon' element={<CreatePokemon/>}/>         
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

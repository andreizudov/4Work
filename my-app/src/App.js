import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from "react-router-dom"
import UploadPages from './pages/UploadPages'
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">
    <header> 
      <Link to='/'>Главная</Link>
      <Link to='/upload'>Загружено</Link>
    </header>
    <Routes>
      <Route path='/' element={<MainPage/>}/> 

      <Route path='/upload' element={<UploadPages/>}/> 
    </Routes>
    
    
      
    </div>
  );
}

export default App;

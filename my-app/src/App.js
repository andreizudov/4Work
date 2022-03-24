import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <h1> Недельные отчеты</h1>
    <form action="/upload" method="post" enctype="multipart/form-data"> 
    <label>Файл</label><br/>
    <input type="file" name="filedata" /><br/>
    <input type="submit" value="Send" /> 
    </form> 
    
    
      
    </div>
  );
}

export default App;

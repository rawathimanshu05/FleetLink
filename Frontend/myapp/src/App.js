import './App.css'
import { Routes,Route, Navigate } from "react-router-dom";
import Page from "./Components/Page";
import SearchBook from './Components/SearchBook';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Navigate to="/Page" />} />
       <Route path='/Page' element={<Page />} />
      <Route path='/SearchBook' element={<SearchBook />} /> 
     </Routes>
    </div>
  );
}

export default App;

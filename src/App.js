import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/LandingPage/LandingPage';
import UpdatePage from './pages/UpdatePage/UpdatePage';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='update' element={<UpdatePage/>}/>
      </Routes>
    </div>
  );
}

export default App;

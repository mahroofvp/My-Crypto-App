import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';


function App() {

  return (
<div className='app-main-div'>

    <BrowserRouter  >
   <Header/>
   <Routes>
   <Route path='/' Component={HomePage} />
   <Route path='/coins/:id' Component={CoinPage} />
   </Routes>
   </BrowserRouter>

</div>
  );
}

export default App;

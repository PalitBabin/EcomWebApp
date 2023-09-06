import Header from "./components/Headers/Header";
import Home from "./components/Home/Home";
import {Box} from '@mui/material';
import DataProvider from "./context/DataProvider";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import DetailView from "./components/Details/DetailView";
import Cart from "./components/Cart/Cart";
import PaymentSuccess from "./PaymentSuccess";
function App() {
  return (
    <DataProvider>
      <>
      <BrowserRouter>
      <Header />
      <Box style={{marginTop:54}}>
        <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id'element={<DetailView />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/paymentsuccess' element={<PaymentSuccess />} />
      </Routes>
      </Box>
      </BrowserRouter>
      </>   
    </DataProvider>
    
  )
}

export default App;

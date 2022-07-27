import './App.css';
import './Landing.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AddProduct from './components/AddProduct/AddProduct';
import Orders from './components/YourOrders/Orders';
import OrderSuccess from './components/YourOrders/OrderSuccess';
import AuthContextProvider from './contexts/AuthContext'
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm'
import NotFound from './components/NotFound';
import ItemConTextProvider from './contexts/ItemContext'
import Item from './components/Item/Item';
import { Rating } from './components/Shop/ItemComp';


function App() {

    return (
        <AuthContextProvider>
            <ItemConTextProvider>
                <BrowserRouter>
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route path='/register' element={<RegisterForm />} />
                            <Route path='/login' element={<LoginForm />} />
                            <Route path="/" element={<Shop />} />
                            <Route path="/addproduct" element={<AddProduct />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/success" element={<OrderSuccess />} />
                            <Route path="/:name" element={<Item />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </div>
                </BrowserRouter>
            </ItemConTextProvider>
        </AuthContextProvider>
    );
}

export default App;

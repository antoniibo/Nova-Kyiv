import React, {useEffect, useState} from "react";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import Home from '../src/pages/Home';
import ShopCategory from "./pages/ShopCategory";
import SearchPage from "./pages/SearchPage";
import Item from '../src/pages/Item';
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import { conection } from "./tools/conections";
import { aboutlinks } from "./tools/aboutlinks";
import { CartProvider } from "./Context/Context";


function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  return (
    <>
    <BrowserRouter>
      <ScrollToTop/>
      <CartProvider>
      <Header/>
      <Routes>
        <Route path="/checkout" element={<Checkout/>}/>
  
          
          <Route path='/' element={<Home/>}/>
          <Route path="/:category/:id" element={<Item />} />
          {conection.map((link,index)=>(
            <Route key={index} path={link.path} element={<ShopCategory category={link.category} heading={link.heading} />} />
          ))}
          <Route path='/search' element={<SearchPage categories={selectedCategories} setCategories={setSelectedCategories} />} />
          {aboutlinks.map((link)=>(
            <Route key={link.id} path={link.path} element={<About id={link.id} heading={link.heading} component={link.component}/>}/>
          ))}
          
      </Routes>
      <Footer/>
      </CartProvider>
    </BrowserRouter>

          
        
    </>
  )
}

export default App

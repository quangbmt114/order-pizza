import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Slider from './components/Layout/Slider';
import Meals from './components/Meals/Meals';
import CartProvider from './Store/CartProvider';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6YN6j89ucnO8sNDqflDPKep1cThDeWgk",
  authDomain: "fir-f9113.firebaseapp.com",
  projectId: "fir-f9113",
  storageBucket: "fir-f9113.appspot.com",
  messagingSenderId: "521229623368",
  appId: "1:521229623368:web:6be8ed94c777c6e565f87d",
  measurementId: "G-W4G3XGPBDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <CartProvider>
      <Header onShow ={handleShow} onHide={handleClose}/>
      {show&&<Cart onClose={handleClose}/>}
      <main>
      <Slider/>
      <Meals/>
      </main>
    </CartProvider>

  );
}

export default App;

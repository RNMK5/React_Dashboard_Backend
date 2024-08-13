import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  // const [showFirmTitle, setShowFirmTitle] = useState(false);

  useEffect(() => {
    const loginToken = localStorage.getItem('login');
    console.log("this is loginToken:",loginToken);
    if(loginToken){
      setShowLogout(true);
    }
  },[])

  // useEffect(() => {
  //     const firmName = localStorage.getItem('firmName');
  //     if(firmName){
  //       setShowFirmTitle(false);
  //     }
  // },[])


  const logOutHandler = () => {
    confirm("are you sure want to logout?")
    localStorage.removeItem('login');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogout(false);
  }

  const showProductHandler = () => { 
    if(showLogout){
      setShowRegister(false);
      setShowLogin(false);
      setShowAddFirm(false);
      setShowProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
    }else{
      alert("Please Login to Access the Application");
      setShowLogin(true)
    }
   
  }

  const showLoginHandler = () => {

    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }

  const showAddFirmHandler = () => {
    if(showLogout){
      setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(true);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    }else{
      alert("Please Login to Access the Application");
      setShowLogin(true);
    }
    
  }

  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  }

  const showAllProductsHandler = () => {
    if(showLogout){
      setShowRegister(false);
      setShowLogin(false);
      setShowAddFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
    }
    else{
      alert("Please Login to Access the Application");
      setShowLogin(true);
    }
   
  }

  return (
    <>
      <section className='landingSection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}
          showLogout={showLogout} 
          logOutHandler = {logOutHandler}/>
        <div className="collectingPages">
          <SideBar 
            showAddFirmHandler={showAddFirmHandler} 
            showProductHandler={showProductHandler} 
            showAllProductsHandler={showAllProductsHandler}
            // showFirmTitle = {showFirmTitle}

          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showAddFirm && showLogout && <AddFirm />}
          {showProduct && showLogout &&<AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogout && <AllProducts />} 
        </div>
      </section>
    </>
  );
}

export default LandingPage;

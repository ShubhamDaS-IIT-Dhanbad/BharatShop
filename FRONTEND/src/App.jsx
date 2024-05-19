import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts, setFilteredProducts } from './redux/features/products/productSlics.jsx';
import { setIsAuthenticated } from './redux/features/logInLogout/authenticationSlice.jsx';
import { setUser } from './redux/features/userData/userDataSlice.jsx';
import Windows from './windowsApp.jsx';
import "./App.css"
const App = React.memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        
        
        dispatch(setUser(userData));
        dispatch(setIsAuthenticated(!!userData));

      
        if (!userData || !userData.pinCodes) return;
        const pinCodesString = userData.pinCodes.join(', ');
        const pinCode = pinCodesString ? pinCodesString : '';
        await dispatch(fetchProducts({ pinCode }));
        dispatch(setFilteredProducts());
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [dispatch]);

  return (
    <>
      <Windows />
    </>
  );
});

export default App;

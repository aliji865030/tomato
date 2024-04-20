import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { app, firestore } from "./../components/Firebase/FireBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword,signOut } from "firebase/auth";
import { Database, ref, set } from 'firebase/database';
import { doc, setDoc,getDoc } from 'firebase/firestore';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [logInStatus, setLogInStatus] = useState(false);
  const [useName, setUserName] = useState();
  const [yourName,setYourName]=useState();
  const [showSignOut,setShowSingOut]=useState(false)

  const auth = getAuth();

  async function signUp(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert("user added");
      setEmail("");
      setPassword("");

      await setDoc(doc(firestore, 'users', user.uid), {
        name: yourName,
        email: email,
      });

    } catch (err) {
      alert(err.message);
    }
  }

  async function logIn(e) {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      
      if (userDoc.exists()) {
        setUserName(userDoc.data().name)
      }

      // console.log(result.user);
      alert("user login");
      setEmail("");
      setPassword("");
      setLogInStatus(true);
    } catch (err) {
      alert(err.message);
    }
  }

  const logOut = async () => {
    try {
    await signOut(auth);
    alert("user logOut")
    setEmail("")
        setPassword("")
    setLogInStatus(false)
    } catch (err){
      console.error(err);
    }
  }

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
    } else {
      setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));
  };

  const getTotalCartAmmount = () => {
    let totalAmount = 0;
    for (let items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInfo = food_list.find((product) => product._id === items);
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmmount,
    signUp,
    setEmail,
    setPassword,
    logIn,
    logInStatus,
    useName,
    setUserName,
    setYourName,
    setShowSingOut,
    showSignOut,
    logOut,
    email,
    password
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

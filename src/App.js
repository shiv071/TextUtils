import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [btnText, setbtnText] = useState('Enable Dark Mode');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setbtnText('Enable Light Mode');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
      // setInterval(() => {
      //   document.title = "Download TextUtils";
      // }, 2000);
      // setInterval(() => {
      //   document.title = "TextUtils is Amazing";
      // }, 1500);
    }
    else {
      setMode('light');
      setbtnText('Enable Dark Mode');
      document.body.style.backgroundColor = '#ffffff';
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    <>  
    <BrowserRouter>
      {/* <Navbar title="TextUtils" aboutText="About TextUtils"/> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} btnText={btnText} />
      <Alert alert={alert} />
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<TextForm showAlert={showAlert} mode={mode} heading="Enter the Text" />}></Route>
          <Route path="/about" element={<About showAlert={showAlert} mode={mode} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App;

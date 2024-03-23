// App.jsx
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputDefault from './components/Select.jsx'
import Coding from './components/Coding';
import { SelectedValueProvider } from './SelectedValueContext.jsx';

function App() {
  return (
    <SelectedValueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InputDefault />} />
          <Route path="/create-repl" element={<Coding />} />
        </Routes>
      </BrowserRouter>
    </SelectedValueProvider>
  )
}

export default App

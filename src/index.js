import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import GeneratePage from "./Generate";

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from './components/Generic/Layout';

import "./css/App.css"
import "./css/snowfall.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<App />} />
            <Route path='/generate/type/:type' element={<GeneratePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
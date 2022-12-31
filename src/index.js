import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from './components/Generic/Layout';

import App from './App';
import GeneratePage from "./Generate";

import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from "react-router-dom";

import "./css/App.css"
import "./css/snowfall.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>

      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<App />} />
            <Route path='generate/type/:type' element={<GeneratePage />} />
          </Route>
        </Routes>
      </HashRouter>

    </ChakraProvider>
  </React.StrictMode>
);
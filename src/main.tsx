import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import "./styles/globals.css";
<<<<<<< HEAD
=======
import './styles/fonts.css';  // Import the custom fonts

>>>>>>> 1231919 (feat: add navbar and button components)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

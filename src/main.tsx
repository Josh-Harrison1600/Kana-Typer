import { createRoot } from 'react-dom/client'
import './index.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </MantineProvider>
)

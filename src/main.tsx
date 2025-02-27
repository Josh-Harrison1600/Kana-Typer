import { createRoot } from 'react-dom/client'
import './index.css'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import AppRouter from './Router.tsx';

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <AppRouter />
  </MantineProvider>
)

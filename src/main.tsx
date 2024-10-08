import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider, Tooltip, createTheme } from '@mantine/core';

const theme = createTheme({
  components: {
    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

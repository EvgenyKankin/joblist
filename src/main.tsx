import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import './reset.css'
import { MantineProvider, createTheme } from '@mantine/core'
import { Provider } from 'react-redux';
import { store } from './features/store';
import App from './App.tsx';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';
import { StrictMode } from 'react';
import { HashRouter } from 'react-router-dom';

const theme = createTheme({
  primaryColor: 'indigo',
});

createRoot(document.getElementById('root')!).render(
<StrictMode> 
  <Provider store={store}>
    <MantineProvider theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </MantineProvider>
  </Provider>
</StrictMode> 
)

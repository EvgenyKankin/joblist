import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css'
import './reset.css'
import { MantineProvider, createTheme } from '@mantine/core'
import { Provider } from 'react-redux';
import { store } from './features/store';
import App from './App.tsx';
import '@fontsource/open-sans/500.css'; // Средний вес (500)
import '@fontsource/open-sans/700.css'; // Жирный (700)

const theme = createTheme({
  primaryColor: 'indigo',
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider theme={theme}>
        <App />
    </MantineProvider>
  </Provider>
)

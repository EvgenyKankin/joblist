import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css'
import './reset.css'
import { MantineProvider, createTheme } from '@mantine/core'
import { Provider } from 'react-redux';
import { store } from './features/store';
import App from './App.tsx';

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

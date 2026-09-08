import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import 'react-loading-skeleton/dist/skeleton.css';
import { applyTheme } from './features/theme/mode/themeStorage';

applyTheme(store.getState().theme.theme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

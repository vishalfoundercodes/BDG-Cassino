import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto'; // Default weight (400)
import '@fontsource/inter'; // Variable font weights
import FirstDepositModalReset from './reusable_component/FirstDepositModalReset';
import { SocketProvider } from "./shared/socket/SocketContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirstDepositModalReset />
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Provider store={store}>
      <SocketProvider>
        <RouterProvider router={Router} />
      </SocketProvider>
    </Provider>
  </StrictMode>
);
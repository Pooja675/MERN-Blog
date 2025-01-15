import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import appStore, { persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
   <Provider store={appStore}>
    <ThemeProvider>
        <App />
    </ThemeProvider>
  </Provider>
  </PersistGate>,
)

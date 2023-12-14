import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import ThemeProviderComponent from './components/ThemeProviderComponent';

ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store}>
      <ThemeProviderComponent>
        <App  /> 
        </ThemeProviderComponent>
      </Provider>
)

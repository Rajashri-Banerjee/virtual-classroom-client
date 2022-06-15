import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { NativeBaseProvider} from 'native-base';
import store from './redux/store'
import  {Provider} from 'react-redux'
import axios from 'axios'
import './css/main.css'
import './css/responsive.css'
axios.defaults.baseURL = 'https://rsb-virtual-classroom.herokuapp.com'

ReactDOM.render(
  <React.StrictMode>
    <NativeBaseProvider>
      <Provider store = {store}>
        <App/>
      </Provider>
    </NativeBaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UiProvider } from './components/UIContext/UIContext';
import UiContext from './components/UIContext/UIContext'
import {Provider} from 'react-redux';
import store from './redux/store';
import { theme } from "../src/theme";
import { ThemeProvider } from '@mui/styles';


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <UiProvider>
                <App />
            </UiProvider>
        </ThemeProvider>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

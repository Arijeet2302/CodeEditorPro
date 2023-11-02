// We are using redux toolkit as a storage to store the auth info of the user

import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
    }
});


export default store;
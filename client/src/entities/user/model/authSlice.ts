import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: userInfoFromStorage,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            window.location.href = '/login';
        },
    },
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;

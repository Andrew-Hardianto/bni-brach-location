import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '', // Usually '' since Vite is proxying or backend is relative
        prepareHeaders: (headers, { getState }) => {
            const userInfoStr = localStorage.getItem('userInfo');
            if (userInfoStr) {
                const userInfo = JSON.parse(userInfoStr);
                if (userInfo.token) {
                    headers.set('Authorization', `Bearer ${userInfo.token}`);
                }
            }
            return headers;
        },
    }),
    tagTypes: ['Cabang', 'Kecamatan', 'Kelurahan', 'Kodepos', 'Kota', 'Outlet', 'Provinsi', 'Wilayah', 'User'],
    endpoints: () => ({}),
});

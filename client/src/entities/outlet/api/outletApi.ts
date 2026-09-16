import { baseApi } from '@/shared/api/baseApi';

export const outletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOutlets: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/outlet?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Outlet'],
        }),
        getOutletById: builder.query<any, string | number>({
            query: (id) => `/outlet/${id}`,
            providesTags: ['Outlet'],
        }),
        createOutlet: builder.mutation<any, any>({
            query: (body) => ({
                url: `/outlet`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Outlet'],
        }),
        updateOutlet: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/outlet/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Outlet'],
        }),
        deleteOutlet: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/outlet/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Outlet'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetOutletsQuery,
    useGetOutletByIdQuery,
    useCreateOutletMutation,
    useUpdateOutletMutation,
    useDeleteOutletMutation,
} = outletApi;

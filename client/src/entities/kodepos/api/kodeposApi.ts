import { baseApi } from '@/shared/api/baseApi';

export const kodeposApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getKodeposs: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/kodepos?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Kodepos'],
        }),
        getKodeposById: builder.query<any, string | number>({
            query: (id) => `/kodepos/${id}`,
            providesTags: ['Kodepos'],
        }),
        createKodepos: builder.mutation<any, any>({
            query: (body) => ({
                url: `/kodepos`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Kodepos'],
        }),
        updateKodepos: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/kodepos/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Kodepos'],
        }),
        deleteKodepos: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/kodepos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Kodepos'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetKodepossQuery,
    useGetKodeposByIdQuery,
    useCreateKodeposMutation,
    useUpdateKodeposMutation,
    useDeleteKodeposMutation,
} = kodeposApi;

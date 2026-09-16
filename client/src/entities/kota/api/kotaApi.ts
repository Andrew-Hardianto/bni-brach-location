import { baseApi } from '@/shared/api/baseApi';

export const kotaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getKotas: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/kota?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Kota'],
        }),
        getKotaById: builder.query<any, string | number>({
            query: (id) => `/kota/${id}`,
            providesTags: ['Kota'],
        }),
        createKota: builder.mutation<any, any>({
            query: (body) => ({
                url: `/kota`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Kota'],
        }),
        updateKota: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/kota/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Kota'],
        }),
        deleteKota: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/kota/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Kota'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetKotasQuery,
    useGetKotaByIdQuery,
    useCreateKotaMutation,
    useUpdateKotaMutation,
    useDeleteKotaMutation,
} = kotaApi;

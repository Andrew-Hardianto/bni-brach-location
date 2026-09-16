import { baseApi } from '@/shared/api/baseApi';

export const kecamatanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getKecamatans: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/kecamatan?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Kecamatan'],
        }),
        getKecamatanById: builder.query<any, string | number>({
            query: (id) => `/kecamatan/${id}`,
            providesTags: ['Kecamatan'],
        }),
        createKecamatan: builder.mutation<any, any>({
            query: (body) => ({
                url: `/kecamatan`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Kecamatan'],
        }),
        updateKecamatan: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/kecamatan/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Kecamatan'],
        }),
        deleteKecamatan: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/kecamatan/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Kecamatan'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetKecamatansQuery,
    useGetKecamatanByIdQuery,
    useCreateKecamatanMutation,
    useUpdateKecamatanMutation,
    useDeleteKecamatanMutation,
} = kecamatanApi;

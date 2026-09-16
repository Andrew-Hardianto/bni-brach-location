import { baseApi } from '@/shared/api/baseApi';

export const wilayahApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWilayahs: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/wilayah?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Wilayah'],
        }),
        getWilayahById: builder.query<any, string | number>({
            query: (id) => `/wilayah/${id}`,
            providesTags: ['Wilayah'],
        }),
        createWilayah: builder.mutation<any, any>({
            query: (body) => ({
                url: `/wilayah`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Wilayah'],
        }),
        updateWilayah: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/wilayah/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Wilayah'],
        }),
        deleteWilayah: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/wilayah/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wilayah'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetWilayahsQuery,
    useGetWilayahByIdQuery,
    useCreateWilayahMutation,
    useUpdateWilayahMutation,
    useDeleteWilayahMutation,
} = wilayahApi;

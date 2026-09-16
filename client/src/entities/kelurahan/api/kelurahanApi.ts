import { baseApi } from '@/shared/api/baseApi';

export const kelurahanApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getKelurahans: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/kelurahan?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Kelurahan'],
        }),
        getKelurahanById: builder.query<any, string | number>({
            query: (id) => `/kelurahan/${id}`,
            providesTags: ['Kelurahan'],
        }),
        createKelurahan: builder.mutation<any, any>({
            query: (body) => ({
                url: `/kelurahan`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Kelurahan'],
        }),
        updateKelurahan: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/kelurahan/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Kelurahan'],
        }),
        deleteKelurahan: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/kelurahan/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Kelurahan'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetKelurahansQuery,
    useGetKelurahanByIdQuery,
    useCreateKelurahanMutation,
    useUpdateKelurahanMutation,
    useDeleteKelurahanMutation,
} = kelurahanApi;

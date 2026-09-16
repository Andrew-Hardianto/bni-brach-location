import { baseApi } from '@/shared/api/baseApi';

export const provinsiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProvinsis: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/provinsi?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Provinsi'],
        }),
        getProvinsiById: builder.query<any, string | number>({
            query: (id) => `/provinsi/${id}`,
            providesTags: ['Provinsi'],
        }),
        createProvinsi: builder.mutation<any, any>({
            query: (body) => ({
                url: `/provinsi`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Provinsi'],
        }),
        updateProvinsi: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/provinsi/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Provinsi'],
        }),
        deleteProvinsi: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/provinsi/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Provinsi'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProvinsisQuery,
    useGetProvinsiByIdQuery,
    useCreateProvinsiMutation,
    useUpdateProvinsiMutation,
    useDeleteProvinsiMutation,
} = provinsiApi;

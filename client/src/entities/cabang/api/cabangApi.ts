import { baseApi } from '@/shared/api/baseApi';

export const cabangApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCabangs: builder.query<any, { page?: number; limit?: number; keyword?: string }>({
            query: (arg) => {
                const { page = 1, limit = 10, keyword = '' } = arg || {};
                return `/cabang?page=${page}&limit=${limit}&keyword=${keyword}`;
            },
            providesTags: ['Cabang'],
        }),
        getCabangById: builder.query<any, string | number>({
            query: (id) => `/cabang/${id}`,
            providesTags: ['Cabang'],
        }),
        createCabang: builder.mutation<any, any>({
            query: (body) => ({
                url: `/cabang`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Cabang'],
        }),
        updateCabang: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/cabang/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Cabang'],
        }),
        deleteCabang: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/cabang/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cabang'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCabangsQuery,
    useGetCabangByIdQuery,
    useCreateCabangMutation,
    useUpdateCabangMutation,
    useDeleteCabangMutation,
} = cabangApi;

import { baseApi } from '@/shared/api/baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (body) => ({
                url: `/auth/login`,
                method: 'POST',
                body,
            }),
        }),
        getUsers: builder.query<any, void>({
            query: () => `/auth`,
            providesTags: ['User'],
        }),
        getUserById: builder.query<any, string | number>({
            query: (id) => `/auth/${id}`,
            providesTags: ['User'],
        }),
        createUser: builder.mutation<any, any>({
            query: (body) => ({
                url: `/auth`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `/auth/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<any, string | number>({
            query: (id) => ({
                url: `/auth/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        getProfile: builder.query<any, void>({
            query: () => `/auth/me`,
            providesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetProfileQuery,
} = authApi;

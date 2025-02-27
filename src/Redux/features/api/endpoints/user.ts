import { apiSlice } from '../apiSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: [{ type: 'Users' }],
    }),
    getUserProfile: builder.query({
      query: () => '/profile',
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    updateUserRole: builder.mutation({
      query: ({ updatedDoc, id }: { updatedDoc: { [key: string]: string }; id: string }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body:  {updatedDoc} , // ✅ Correct (sending as { role: "admin" })
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }),
      invalidatesTags: ["Users"],
    }),
    
  }),
});

export const { useDeleteUserMutation, useGetAllUsersQuery, useGetUserProfileQuery, useUpdateUserRoleMutation } = userApi;

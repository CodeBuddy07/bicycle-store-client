import { apiSlice } from "../apiSlice";
import { setAuth } from "../authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(setAuth({ token: data.token, user: data.user }));
        } catch (error) {
          console.error("Login error: ", error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/update-password",
        method: "PUT",
        body: passwordData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Password updated:", data.message);
        } catch (error) {
          console.error("Password update error:", error);
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useUpdatePasswordMutation } = authApi;

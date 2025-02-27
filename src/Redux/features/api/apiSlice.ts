import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { logout } from "./authSlice"; // Ensure correct import

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bi-cycle-strore-server.vercel.app/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Get token from Redux state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  Parameters<typeof baseQuery>[0],
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Debugging: Log the result to check for errors
  console.log("API Response:", result);

  if (result.error?.status === 401) {
    console.error("Unauthorized. Logging out...");

    // Dispatch logout action and ensure Redux state is updated
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Users", "Products", "Orders", "Revenue" ],
  endpoints: () => ({}),
});

export default apiSlice;

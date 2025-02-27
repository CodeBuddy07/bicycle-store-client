import { apiSlice } from "../apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Orders"],
    }),

    processPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/pay",
        method: "POST",
        body: paymentData,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    getRevenue: builder.query({
      query: () => ({
        url: "/orders/revenue",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Revenue"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useProcessPaymentMutation,
  useGetRevenueQuery,
} = orderApi;

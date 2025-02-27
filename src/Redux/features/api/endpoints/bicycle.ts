import { toast } from "react-toastify";
import { apiSlice } from "../apiSlice";

export type Bicycle = {
    name: string;
    brand: string;
    price: number;
    type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
    description: string;
    quantity: number;
    inStock: boolean;
    photos: string[]; 
  };

export const bicycleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBicycle: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
      async onQueryStarted({queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if(data.success){
            return data.data;
          }else{
            toast(data.message);
          }
         
        } catch (error) {
          console.error("Login error: ", error);
        }
      },
    }),

    getBicycles: builder.query({
      query: ({ searchTerm, value }: { searchTerm: string, value: string }) => `/products?${searchTerm}=${value}`,
      providesTags: [{ type: 'Products' }],
    }),

    addBicycle: builder.mutation({
      query: (formData: FormData) => ({
        url: `/products`,
        method: "PUT",
        body: formData, // Sending FormData for image upload
        formData: true, // Tells RTK Query to send data as FormData
      }),
      invalidatesTags: ["Products"], // Refresh data after update
    }),
    

    updateBicycle: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Products"], // Refresh data after update
    }),

    deleteBicycle: builder.mutation({
      query: ( id ) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"], // Refresh data after update
    }),
  }),
});

export const { useGetBicycleQuery, useUpdateBicycleMutation, useAddBicycleMutation, useGetBicyclesQuery, useDeleteBicycleMutation } = bicycleApi;

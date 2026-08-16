import { IOrder } from "@/components/order/OrderList";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Images", "Orders"],
  endpoints: (builder) => ({
    // Use for repair services start from here

    uploadProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/order/upload_image/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Images"],
    }),

    deleteProductImage: builder.mutation({
      query({ orderId, body }) {
        return {
          url: `/order/delete_image/${orderId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Images"],
    }),

    createOrder: builder.mutation({
      query(body) {
        return {
          url: "/order",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Images"],
    }),

    updateOrder: builder.mutation({
      async queryFn(reqData, _api, _extraOptions, fetchWithBQ) {
        const { _id, images, ...reqPayload } = reqData;

        const updateResult = await fetchWithBQ({
          url: `/order/update/${_id}`,
          method: "PUT",
          body: { ...reqPayload, _id },
        });

        if (updateResult.error) {
          return { error: updateResult.error };
        }

        const uploadResult = await fetchWithBQ({
          url: `/order/upload_image/${_id}`,
          method: "PUT",
          body: { images },
        });

        if (uploadResult.error) {
          return { error: uploadResult.error };
        }

        return {
          data: updateResult.data,
        };
      },
    }),

    getOrderById: builder.query({
      query(id) {
        return {
          url: `/order/${id}`,
        };
      },
      providesTags: ["Orders"],
    }),

    getAllOrder: builder.query<{ success: boolean; data: IOrder[] }, void>({
      query: () => "/orders",
      providesTags: ["Images"],
    }),

    //only for admin use case start from here

    getOrderByIdAdmin: builder.query<{ success: Boolean; data: any }, string>({
      query(id) {
        return {
          url: `/admin/order/${id}`,
        };
      },
    }),

    getAllOrderAdmin: builder.query<{ success: Boolean; data: IOrder[] }, void>(
      {
        query: () => "/admin/orders",
        providesTags: ["Images"],
      }
    ),

    genrateInvoiceAdmin: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/order/${id}`,
          method: "PUT",
          body,
        };
      },
    }),

    genrateQuotationAdmin: builder.mutation({
      query({ id, body }) {
        body.orderStatus = "Verified";
        console.log("hhh", body);
        return {
          url: `/admin/quotation/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
  useLazyGetAllOrderQuery,
  useGetAllOrderQuery,
  useLazyGetAllOrderAdminQuery,
  useGetAllOrderAdminQuery,

  useGenrateInvoiceAdminMutation,
  useGenrateQuotationAdminMutation,

  useGetOrderByIdAdminQuery,
  useLazyGetOrderByIdAdminQuery,
} = orderApi;

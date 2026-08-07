import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // POST    /api/admin/invoice                    -> createInvoice
    createInvoice: builder.mutation({
      query(body) {
        return {
          url: "/admin/invoice",
          method: "POST",
          body,
        };
      },
    }),

    // GET     /api/admin/invoice                    -> getInvoices
    getInvoices: builder.query({
      query() {
        return {
          url: "/admin/invoice",
        };
      },
    }),

    // GET     /api/admin/invoice/[id]               -> getInvoiceById
    getInvoiceById: builder.query({
      query(id) {
        return {
          url: `/admin/invoice/${id}`,
        };
      },
    }),

    // PUT    /api/admin/invoice/[id]               -> updateInvoice
    updateInvoice: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/invoice/${id}`,
          method: "PUT",
          body,
        };
      },
    }),

    // DELETE  /api/admin/invoice/[id]        -> deleteInvoice
    deleteInvoice: builder.mutation({
      query(id) {
        return {
          url: `/admin/invoice/${id}`,
          method: "DELETE",
        };
      },
    }),

    // GET     /api/admin/invoice/order/[orderId]    -> getInvoiceByOrder
    getInvoiceByOrder: builder.query({
      query(id) {
        return {
          url: `/admin/invoice/order/${id}`,
        };
      },
    }),

    uploadInvoice: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/order/upload_invoice/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
  useLazyGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetInvoiceByOrderQuery,
  useLazyGetInvoiceByOrderQuery,
  useUploadInvoiceMutation,
} = invoiceApi;

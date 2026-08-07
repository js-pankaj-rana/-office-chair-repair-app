import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddress } from "@/backend/models/user";

interface IAddressResponse {
  success: boolean;
  count: number;
  data: IAddress[];
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };
      },
    }),
    updateSession: builder.query({
      query() {
        return {
          url: "/auth/session?update",
        };
      },
    }),
    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/me/update_password",
          method: "PUT",
          body,
        };
      },
    }),
    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: "/me/upload_avatar",
          method: "PUT",
          body,
        };
      },
    }),
    updateUser: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/users/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
    }),
    addAddress: builder.mutation({
      query(body) {
        return {
          url: `address/add`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Address"],
    }),

    editAddress: builder.mutation({
      query({ id, address }) {
        return {
          url: `address/edit/${id}`,
          method: "PUT",
          body: address,
        };
      },
      invalidatesTags: ["Address"],
    }),

    getAddressList: builder.query<IAddressResponse, null>({
      query: () => ({
        url: "/address/all",
      }),
      providesTags: ["Address"],
    }),

    getAddress: builder.query<IAddress, string>({
      query: (id) => ({ url: `/address/${id}` }),
    }),

    deleteAddress: builder.mutation({
      query(id) {
        return {
          url: `address/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Address"],
    }),

    // updateProfile: builder.mutation({
    //   query(body) {
    //     return {
    //       url: "/me/update",
    //       method: "PUT",
    //       body,
    //     };
    //   },
    // }),

    resetEmailAddress: builder.query({
      query(token) {
        return {
          url: `auth/email/reset/${token}`,
        };
      },
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useLazyUpdateSessionQuery,
  useUpdatePasswordMutation,
  useUploadAvatarMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddAddressMutation,
  useEditAddressMutation,
  useGetAddressListQuery,
  useGetAddressQuery,
  useDeleteAddressMutation,
  useLazyResetEmailAddressQuery,
} = userApi;

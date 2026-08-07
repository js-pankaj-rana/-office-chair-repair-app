// import { NextRequest, NextResponse } from "next/server";
// import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
// import Customers, { ICustomer } from "../models/customers";
// import ErrorHandler from "../utils/errorHandler";

// // Create new customer   =>  /api/customer
// export const newCustomer = catchAsyncErrors(async (req: NextRequest) => {
//   const body = await req.json();

//   const {
//     userId,
//     phone,
//     addressLine1,
//     addressLine2,
//     city,
//     state,
//     postalCode,
//     country,
//   } = body;

//   const customer = await Customers.create({
//     userId,
//     phone,
//     address: [
//       {
//         addressLine1,
//         addressLine2,
//         city,
//         state,
//         postalCode,
//         isDefault: true,
//       },
//     ],
//     country,
//   });

//   return NextResponse.json({
//     customer,
//   });
// });

// // Update customer profile  =>  /api/customer/update
// export const updateCustomerAddress = catchAsyncErrors(
//   async (req: NextRequest) => {
//     const body = await req.json();
//     const {
//       userId,
//       addressId,
//       addressLine1,
//       addressLine2,
//       city,
//       state,
//       postalCode,
//     } = body;

//     const customer = await Customers.updateOne(
//       { userId, "address.addressId": addressId },
//       {
//         $set: {
//           "address.$.addressLine1": addressLine1,
//           "address.$.addressLine2": addressLine2,
//           "address.$.city": city,
//           "address.$.state": state,
//           "address.$.postalCode": postalCode,
//           "address.$.isDefault": true,
//         },
//       },
//     );

//     return NextResponse.json({
//       success: true,
//       customer,
//     });
//   },
// );

// // Add new customer address  =>  /api/customer/addaddress
// export const addNewCustomerAddress = catchAsyncErrors(
//   async (req: NextRequest) => {
//     const body = await req.json();
//     const { userId, addressLine1, addressLine2, city, state, postalCode } =
//       body;

//     const customer = await Customers.updateOne(
//       { userId },
//       {
//         $push: {
//           "address.$.addressLine1": addressLine1,
//           "address.$.addressLine2": addressLine2,
//           "address.$.city": city,
//           "address.$.state": state,
//           "address.$.postalCode": postalCode,
//           "address.$.isDefault": true,
//         },
//       },
//     );

//     return NextResponse.json({
//       success: true,
//       customer,
//     });
//   },
// );

// // Add new customer address  =>  /api/customer/deleteaddress
// export const deleteCustomerAddress = catchAsyncErrors(
//   async (req: NextRequest) => {
//     const body = await req.json();
//     const { userId, addressId } = body;

//     await Customers.updateOne(
//       {
//         userId,
//         "address.addressId": addressId,
//       },
//       {
//         $pull: {
//           address: {
//             addressId,
//           },
//         },
//       },
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Address deleted successfully",
//     });
//   },
// );

// // Get customer details  =>  /api/customer
// export const getCustomerDetails = catchAsyncErrors(
//   async (req: NextRequest, { params }: { params: { userId: string } }) => {
//     const customer = await Customers.findOne({ userId: params.userId });

//     if (!customer) {
//       throw new ErrorHandler("Customer not found with this ID", 404);
//     }

//     return NextResponse.json({
//       customer,
//     });
//   },
// );

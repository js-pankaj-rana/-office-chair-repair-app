import AdminSidebar from "@/components/layout/AdminSidebar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="mt-2 mb-4 py-3 border-bottom">
        <h3 className="text-brand text-center">Admin Dashboard</h3>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-2">
            <AdminSidebar />
          </div>
          <div className="col-12 col-lg-10 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

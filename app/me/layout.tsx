import UserSidebar from "@/components/layout/UserSidebar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UserLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="mt-2 mb-4 py-3 border-bottom">
        <h3 className="text-brand text-center">User management</h3>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <UserSidebar />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;

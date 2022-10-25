import { Outlet } from "react-router-dom";

import Header from "../UserHeader";

const UserLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;

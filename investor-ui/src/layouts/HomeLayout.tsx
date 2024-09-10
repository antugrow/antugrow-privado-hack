import HomeNavbar from "@/components/layout/HomeNavbar";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const HomeLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 transition-all">
      <HomeNavbar />
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar should go here */}
        <div className="flex flex-1 flex-col px-2 md:px-[30px] py-5 overflow-y-auto h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;

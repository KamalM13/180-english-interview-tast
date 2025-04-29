import { NavbarSimple } from "@/components/navbar";
import { Outlet } from "react-router";

const TodoLayout = () => {
  return (
    <div>
      <NavbarSimple siteName="TodoList Interview Project" />
      <div className="pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default TodoLayout;

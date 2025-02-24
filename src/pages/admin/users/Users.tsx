import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AdminLayout from "../AdminLayout";
import UserTable from "./componets/UserTable";
import { fetchUsers } from "../../../store/adminUserSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((store) => store.users);
  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch]);
  return (
    <AdminLayout>
      <UserTable users={users} />
    </AdminLayout>
  );
};

export default Users;

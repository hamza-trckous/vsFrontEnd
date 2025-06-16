"use client";
import { deleteUser, getAllUsers } from "@/api/users";
import { User } from "@/Types/UserPart";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";

interface UserContextProps {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
  handleDelete: (id: string) => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {}, [users]);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) =>
        prevUsers ? prevUsers.filter((user) => user._id !== id) : null
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <UserContext.Provider
      value={{
        handleDelete,
        users,
        setUsers,
        user,
        setUser
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();
const AppContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
  const resetStates = () => {
    setUser({});
    setSelectedChat(null);
    setChats([]);
  }
  return (
    <UserContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, fetchChatsAgain, setFetchChatsAgain, resetStates }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const GetContext = () => {
  return useContext(UserContext);
};

export default AppContext;

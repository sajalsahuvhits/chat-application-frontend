import React, { useEffect, useState } from "react";
import { getApiHandler } from "../../../config/DataService";
import { UserApiEndpoint } from "../../../config/Api";
import { toast } from "react-toastify";
import { GetContext } from "../../../appContext/AppContext";
import Index from "../../Index";
import { getSender } from "../../../utils/utils";
const MyChats = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchChatsAgain,
    setFetchChatsAgain,
  } = GetContext();
  const fetchChats = async () => {
    const resp = await getApiHandler(UserApiEndpoint.FETCH_CHATS);
    if (resp.status === 200) {
      setChats(resp.data.chats);
    } else {
      toast.error(resp.message);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchChatsAgain]);
  return (
    <Index.Box
      className="p-4 border rounded"
      sx={{ height: "90vh", overflowY: "auto" }}
    >
      <Index.Box className="py-1">My Chats</Index.Box>
      <Index.Box className="py-2">
        {chats.length ? (
          <Index.Box>
            {chats?.map((chat, ind) => (
              <Index.Box
                key={chat._id}
                onClick={() => {
                  setSelectedChat(chat);
                }}
                sx={{ cursor: "pointer" }}
              >
                <Index.Box
                  display="flex"
                  gap={2}
                  className="p-2 my-1 border rounded"
                  bgcolor={
                    selectedChat && selectedChat._id === chat._id
                      ? "#2196f3"
                      : "#f5f5f5"
                  }
                  color={
                    selectedChat && selectedChat._id === chat._id
                      ? "#fff"
                      : "#000"
                  }
                >
                  <Index.Avatar />
                  <Index.Box display="flex" flexDirection="column">
                    <Index.Typography my="auto">
                      {getSender("name", user, chat.users)}
                    </Index.Typography>
                    {chat.latestMessage && (
                      <Index.Typography sx={{ fontSize: "12px" }} my="auto">
                        {chat.latestMessage.content.length > 25
                          ? chat.latestMessage.content.substring(0, 26) + "..."
                          : chat.latestMessage.content}
                      </Index.Typography>
                    )}
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            ))}
          </Index.Box>
        ) : (
          <Index.Box></Index.Box>
        )}
      </Index.Box>
    </Index.Box>
  );
};

export default MyChats;

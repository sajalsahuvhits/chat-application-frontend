import React, { useEffect, useRef, useState } from "react";
import Index from "../../Index";
import { GetContext } from "../../../appContext/AppContext";
import { getApiHandler, postApiHandler } from "../../../config/DataService";
import { UserApiEndpoint } from "../../../config/Api";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { getSender } from "../../../utils/utils";
let socket, selectedChatCompare;
const serverUrl = "http://localhost:8010";

const ChatRoom = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchChatsAgain,
    setFetchChatsAgain,
  } = GetContext();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState([]);
  const handleScrollRef = useRef();
  const fetchMessages = async () => {
    const resp = await getApiHandler(
      UserApiEndpoint.GET_MESSAGES + `/${selectedChat._id}`
    );
    if (resp?.status === 200) {
      setMessages(resp.data);
      socket.emit("join chat", selectedChat._id);
    } else {
      toast.error(resp.message);
    }
  };
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMsg) {
      const resp = await postApiHandler(UserApiEndpoint.SEND_MSG, {
        content: newMsg,
        chatId: selectedChat,
      });
      if (resp.status === 200) {
        socket.emit("new message", resp.data);
        setMessages([...messages, resp.data]);
        setFetchChatsAgain(!fetchChatsAgain);
      }
      setNewMsg("");
    }
  };
  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
      selectedChatCompare = selectedChat;
      setNewMsg("");
    }
  }, [selectedChat]);
  useEffect(() => {
    socket = io(serverUrl);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("client socket connected...");
    });
  }, [user]);

  useEffect(() => {
    if (handleScrollRef && handleScrollRef.current)
      handleScrollRef.current.scrollTo(0, handleScrollRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        setFetchChatsAgain(!fetchChatsAgain);
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  return (
    <Index.Box className="px-4 py-2 border rounded" sx={{ height: "90vh" }}>
      {selectedChat ? (
        <Index.Box width="100%" p={2}>
          <Index.Box display="flex" gap={2} mb={2}>
            <Index.Avatar />
            <Index.Typography py={1}>
              {getSender("name", user, selectedChat.users)}
            </Index.Typography>
          </Index.Box>
          <Index.Box
            className="p-2 border rounded"
            sx={{
              height: "64vh",
              overflowY: "auto",
              backgroundColor: "#f5f5f5",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "end"
            }}
            ref={handleScrollRef}
          >
            {messages &&
              messages.map((msg, i) => (
                <Index.Box
                  key={msg._id}
                  display="flex"
                  justifyContent={user._id === msg.sender._id ? "end" : "start"}
                  mb={1}
                >
                  <Index.Box
                    className="rounded text-wrap p-2"
                    bgcolor={
                      user._id === msg.sender._id ? "#00b8d4" : "#8bc34a"
                    }
                  >
                    {msg.content}
                  </Index.Box>
                </Index.Box>
              ))}
          </Index.Box>
          <Index.Box mt={1}>
            <Index.FormControl onKeyDown={sendMessage} fullWidth>
              <Index.TextField
                fullWidth
                placeholder="Type a message..."
                multiline
                rows={2}
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
              />
            </Index.FormControl>
          </Index.Box>
        </Index.Box>
      ) : (
        <Index.Box>
          <Index.Typography fontSize="3xl" pb={3}>
            Click on a user to start chat...
          </Index.Typography>
        </Index.Box>
      )}
    </Index.Box>
  );
};

export default ChatRoom;

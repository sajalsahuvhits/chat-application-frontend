import React from "react";
import AppLayout from "../../../components/user/defaultLayout";
import Index from "../../../components/Index";
import MyChats from "../../../components/user/myChats/MyChats";
import ChatRoom from "../../../components/user/chatRoom/ChatRoom";
const Chat = () => {
  return (
    <AppLayout>
      <Index.Grid container spacing={2}>
        <Index.Grid item xs={4}>
            <MyChats/>
        </Index.Grid>
        <Index.Grid item xs={8}>
            <ChatRoom/>
        </Index.Grid>
      </Index.Grid>
    </AppLayout>
  );
};

export default Chat;

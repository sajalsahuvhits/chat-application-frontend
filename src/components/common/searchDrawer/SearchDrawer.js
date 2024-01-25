import React, { useEffect, useState } from "react";
import Index from "../../Index";
import { getSender } from "../../../utils/utils";
import { GetContext } from "../../../appContext/AppContext";
import { toast } from "react-toastify";
import { getApiHandler, postApiHandler } from "../../../config/DataService";
import { UserApiEndpoint } from "../../../config/Api";
const SearchDrawer = ({ openSearchDrawer, setOpenSearchDrawer }) => {
  const [searchUserList, setSearchUserList] = useState([]);
  const [search, setSearch] = useState("");
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchChatsAgain,
    setFetchChatsAgain,
  } = GetContext();
  const handleSearch = async () => {
    if (!search) {
      setSearchUserList([]);
      return;
    }
    const resp = await getApiHandler(
      UserApiEndpoint.SEARCH_USER + `?search=${search}`
    );
    console.log(resp);
    if (resp.status === 200) {
      setSearchUserList(resp.data.users);
    } else {
      toast.error(resp.message);
    }
  };
  const accessChat = async (userId) => {
    const resp = await postApiHandler(UserApiEndpoint.CREATE_CHAT, { userId });
    if (resp.status === 201) {
      setSelectedChat(resp.data);
      if (!chats.find((ch) => ch._id === resp.data._id)) {
        setChats([resp.data, ...chats]);
      }
      setOpenSearchDrawer(false);
      setSearchUserList([]);
      setSearch("");
    } else {
      toast.error(resp.message);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);
  return (
    <Index.Drawer
      anchor="left"
      open={openSearchDrawer}
      onClose={(e) => setOpenSearchDrawer(false)}
    >
      <Index.Box
        p={4}
        sx={{ width: 350 }}
        role="presentation"
        // onClick={(e) => setOpenSearchDrawer(false)}
        display="flex"
        flexDirection="column"
      >
        <Index.Box>
          <Index.TextField
            fullWidth
            placeholder="Search user by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Index.Box>
        <Index.Box>
          {searchUserList?.map((userInfo) => (
            <Index.Box
              key={userInfo._id}
              sx={{ cursor: "pointer" }}
              onClick={(e) => accessChat(userInfo._id)}
            >
              <Index.Box
                display="flex"
                gap={1}
                className="p-2 my-1 border rounded"
                bgcolor="#f5f5f5"
              >
                <Index.Avatar />
                <Index.Box display="flex" flexDirection="column">
                  <Index.Typography my="auto">{userInfo.name}</Index.Typography>
                  <Index.Typography sx={{ fontSize: "12px" }} my="auto">
                    {userInfo.email}
                  </Index.Typography>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          ))}
        </Index.Box>
      </Index.Box>
    </Index.Drawer>
  );
};

export default SearchDrawer;

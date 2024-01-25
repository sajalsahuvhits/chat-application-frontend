import React, { useEffect, useState } from "react";
import Header from "./Header";
import SearchDrawer from "../../common/searchDrawer/SearchDrawer";
import Index from "../../Index";
import { GetContext } from "../../../appContext/AppContext";
import { useNavigate } from "react-router-dom";
const AppLayout = ({ children }) => {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const { user, setUser } = GetContext();
  const userInfo = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) setUser(JSON.parse(userInfo));
    else navigate("/login");
  }, []);
  return (
    <Index.Box>
      <Header setOpenSearchDrawer={setOpenSearchDrawer} />
      <SearchDrawer
        openSearchDrawer={openSearchDrawer}
        setOpenSearchDrawer={setOpenSearchDrawer}
      />
      <Index.Box sx={{ height: "93vh" }} mt={1}>
        {children}
      </Index.Box>
    </Index.Box>
  );
};

export default AppLayout;

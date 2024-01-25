import React from "react";
import Index from "../../Index";
import { GetContext } from "../../../appContext/AppContext";
import { useNavigate } from "react-router-dom";
export default function Header({ setOpenSearchDrawer }) {
  const { user, resetStates } = GetContext();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("user");
    resetStates();
    navigate("/login");
  };
  return (
    <Index.Box sx={{ flexGrow: 1 }}>
      <Index.AppBar position="static" sx={{ bgcolor: "#fff" }}>
        <Index.Toolbar>
          <Index.Box display="flex" width="100%" justifyContent="space-between">
            <Index.Button
              variant="outlined"
              size="large"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={(e) => setOpenSearchDrawer(true)}
            >
              <Index.SearchIcon /> Start new chat...
            </Index.Button>
            <Index.Box display="flex" gap={2}>
              <Index.Typography variant="h6" component="div" color="black">
                {user?.name}
              </Index.Typography>
              <Index.Button variant="contained" color="warning" onClick={handleLogout}>
                Logout
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Toolbar>
      </Index.AppBar>
    </Index.Box>
  );
}

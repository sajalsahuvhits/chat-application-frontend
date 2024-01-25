import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AllRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
            <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AllRoutes/>
    </ThemeProvider>
  );
}

export default App;

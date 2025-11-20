import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import { ColorModeContext } from "./ColorModeContext";

function Root() {
  const [mode, setMode] = useState("dark"); // default theme

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <StrictMode>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);

export default Root;

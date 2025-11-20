import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import { ColorModeContext, ColorMode } from "./ColorModeContext";

function Root() {
  const [mode, setMode] = useState<ColorMode>("dark");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "dark"));
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

createRoot(document.getElementById("root") as HTMLElement).render(<Root />);

export default Root;

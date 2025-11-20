import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: { main: "#90caf9" },
            secondary: { main: "#f48fb1" },
            background: {
              default: "#121212",
              paper: "#1e1e1e"
            }
          }
        : {
            primary: { main: "#1976d2" },
            secondary: { main: "#9c27b0" },
            background: {
              default: "#f5f5f5",
              paper: "#ffffff"
            }
          })
    }
  });

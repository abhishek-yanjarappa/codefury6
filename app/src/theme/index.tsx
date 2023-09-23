import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#a0de6d",
    },
    secondary: {
      main: "#898989",
    },
  },
  typography: {
    fontFamily: [
      "Figtree",
      "Lato",
      "-apple-system",
      "BlinkMacSystemFont",
      "Roboto",
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
  },
});

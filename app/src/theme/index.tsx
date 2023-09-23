import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#44622c",
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

import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

import { defaultTheme } from "./theme";
//@ts-ignore
import { FirebaseAuthentication as FireAuth } from "@capacitor-firebase/authentication";
import Welcome from "./pages/Auth/Welcome";
import { useMemo } from "react";
setupIonicReact();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: Infinity,
      cacheTime: Infinity,
      retry: false,
      retryOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const App: React.FC = () => {
  const currentUser = useMemo(() => {
    const getUser = async () => {
      const user = await FireAuth.getCurrentUser();
      return user;
    };
    return getUser();
  }, []);
  console.log(currentUser, "at app");
  return (
    <IonApp>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <QueryClientProvider client={queryClient}></QueryClientProvider>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/">
                <Welcome />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </IonApp>
  );
};

export default App;

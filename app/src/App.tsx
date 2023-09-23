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
import Home from "./pages/Home";
import { getCurrentUser } from "./utils";
import Guides from "./pages/Guides";
import Profile from "./pages/Profile";
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
    return getCurrentUser();
  }, []);
  return (
    <IonApp>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <QueryClientProvider client={queryClient}>
            <IonReactRouter>
              <IonRouterOutlet>
                {/* if user is logged in */}
                {currentUser ? (
                  <>
                    <Route exact path="/home">
                      <Home />
                    </Route>
                    <Route exact path="/guides">
                      <Guides />
                    </Route>
                    <Route exact path="/profile">
                      <Profile />
                    </Route>
                    <Route exact path="/*">
                      <Redirect to="/home" />
                    </Route>
                  </>
                ) : (
                  <>
                    <Route exact path="/">
                      <Welcome />
                    </Route>
                    <Route exact path="/*">
                      <Redirect to="/" />
                    </Route>
                  </>
                )}
              </IonRouterOutlet>
            </IonReactRouter>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </IonApp>
  );
};

export default App;

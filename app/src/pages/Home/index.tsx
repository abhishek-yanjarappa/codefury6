import React, { useMemo, useState } from "react";
import { Screen, Window } from "../../components/ui/ViewPort";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Questions from "./questions";
import BottomTabs from "../../components/ui/BottomTabs";
import { IonContent } from "@ionic/react";
import { PhoneEventUsage } from "capacitor-phone-event-usage";

const Home = () => {
  const data = useMemo(async () => {
    const oo = await PhoneEventUsage.enable();
    console.log(oo);
    const perms = await PhoneEventUsage.getPermissionStatus();
    console.log(perms);
    const user = await PhoneEventUsage.getAppUsage(10);
    console.log(user);
    return user;
  }, []);
  console.log(data);
  return (
    <Screen>
      <Window padding={5}>
        <IonContent>
          <Questions />
        </IonContent>
        <BottomTabs tab="home" />
      </Window>
    </Screen>
  );
};

export default Home;

import React, { useState } from "react";
import { Screen, Window } from "../../components/ui/ViewPort";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Questions from "./questions";
import BottomTabs from "../../components/ui/BottomTabs";
import { IonContent } from "@ionic/react";

const Home = () => {
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

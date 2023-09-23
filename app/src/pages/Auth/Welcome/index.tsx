import React from "react";
import { Typography, Button } from "@mui/material";
import { Window, Screen } from "../../../components/ui/ViewPort";
//@ts-ignore
import { FirebaseAuthentication as FireAuth } from "@capacitor-firebase/authentication";

const Welcome: React.FC = () => {
  return (
    <Screen>
      <Window alignItems={"center"} padding={"25px"}>
        <Typography variant="h1" marginY={"10px"} color={"primary.dark"}>
          Hi.
        </Typography>

        <Typography marginTop={"120px"} variant="h6" align="center">
          Get started with your Google Account.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginY: "20px" }}
          onClick={async () => {
            const result = await FireAuth.signInWithGoogle();
          }}
        >
          Get in with Google
        </Button>
      </Window>
    </Screen>
  );
};

export default Welcome;

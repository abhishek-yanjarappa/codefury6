import React from "react";
import { Typography, Button } from "@mui/material";
import { Window, Screen } from "../../../components/ui/ViewPort";
//@ts-ignore
import { FirebaseAuthentication as FireAuth } from "@capacitor-firebase/authentication";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { scheduleNotifications } from "../../../utils";

const Welcome: React.FC = () => {
  const handleSignup = async () => {
    const result = await FireAuth.signInWithGoogle();
    const userRef = doc(collection(db, "users"), result?.user?.uid);
    await setDoc(userRef, result?.user, { merge: true });
    localStorage.setItem("user", JSON.stringify(result?.user));
    localStorage.setItem("journalTime", "08:00");
    scheduleNotifications();

    window.location.reload();
  };

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
          onClick={handleSignup}
        >
          Get in with Google
        </Button>
      </Window>
    </Screen>
  );
};

export default Welcome;

import React, { useState } from "react";
import { Screen, Window } from "../../components/ui/ViewPort";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { IonContent } from "@ionic/react";
import BottomTabs from "../../components/ui/BottomTabs";
import { getCurrentUser, scheduleNotifications } from "../../utils";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useQuery } from "@tanstack/react-query";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function getBackgroundColor(moodRating: number) {
  switch (moodRating) {
    case 1:
      return "#ff3f3f";
    case 2:
      return "orange";
    case 3:
      return "yellow";
    case 4:
      return "lightgreen";
    case 5:
      return "#00ff5e";
    default:
      return "white";
  }
}

const Profile = () => {
  const userData = getCurrentUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const journalTimeString = localStorage.getItem("journalTime") as string;
  const journalTimeDate = dayjs()
    .set("hour", parseInt(journalTimeString.split(":")[0]))
    .set("minute", parseInt(journalTimeString.split(":")[1]));

  const { data: allJournal, isLoading: isLoadingTodaysJournal } = useQuery(
    ["all-journals"],
    async () => {
      const userRef = doc(db, "users", userData?.uid as string);
      const journalsRef = collection(userRef, "journals");
      const q = query(journalsRef);

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs;
    }
  );
  return (
    <Screen>
      <Window padding={5}>
        <Typography variant="h6">Profile</Typography>
        <IonContent>
          <Avatar
            sx={{ width: "90px", height: "90px", marginTop: 5 }}
            src={userData?.photoUrl}
            alt="avatar"
          />

          <Typography variant="h6" marginTop={2}>
            {userData?.displayName}
          </Typography>
          <Typography variant="body2">{userData?.email}</Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginY: 2 }}
            onClick={async () => {
              await FirebaseAuthentication.signOut();
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
          <br />
          <TimePicker
            label="Journaling Time"
            value={journalTimeDate}
            onAccept={(e) => {
              const dateString = dayjs(e).format("HH:mm").toString();
              localStorage.setItem("journalTime", dateString);
              scheduleNotifications();
            }}
            onChange={(e) => console.log(dayjs(e).format("HH:mm").toString())}
          />

          <Typography variant="h6" marginTop={3}>
            Your Journal history
          </Typography>

          <Box width="100%" display={"flex"} gap={1} flexDirection={"column"}>
            {allJournal?.map((journal, k) => (
              <Box
                onClick={() => setSelectedDate(journal?.data().date)}
                flex={1}
                padding={2}
                sx={{
                  backgroundColor: getBackgroundColor(
                    journal?.data().moodRating
                  ),
                }}
                key={k}
              >
                <Typography>{journal?.data().date as string}</Typography>
                {selectedDate === journal?.data().date && (
                  <Typography>{journal?.data().journalData}</Typography>
                )}
              </Box>
            ))}
          </Box>
        </IonContent>
        <BottomTabs tab="profile" />
      </Window>
    </Screen>
  );
};

export default Profile;

import React, { useState } from "react";
import { Screen, Window } from "../../components/ui/ViewPort";
import {
  Avatar,
  Box,
  Button,
  Modal,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { IonContent } from "@ionic/react";
import BottomTabs from "../../components/ui/BottomTabs";
import { getCurrentUser, scheduleNotifications } from "../../utils";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useQuery } from "@tanstack/react-query";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import dayjs from "dayjs";

function getBackgroundColor(moodRating: number) {
  switch (moodRating) {
    case 1:
      return "#ff3f3f";
    case 2:
      return "#ffa82f";
    case 3:
      return "yellow";
    case 4:
      return "#75ffb3";
    case 5:
      return "#00ff5e";
    default:
      return "white";
  }
}

const Profile = () => {
  const userData = getCurrentUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState<"date" | "mood">("date");
  const [searchDate, setSearchDate] = useState(null);
  const [searchMood, setSearchMood] = useState(null);
  const journalTimeString = localStorage.getItem("journalTime") as string;
  const journalTimeDate = dayjs()
    .set("hour", parseInt(journalTimeString.split(":")[0]))
    .set("minute", parseInt(journalTimeString.split(":")[1]));

  const { data: allJournal, isLoading: isLoadingJournal } = useQuery(
    ["all-journals", searchDate, searchMood],
    async () => {
      const userRef = doc(db, "users", userData?.uid as string);
      const journalsRef = collection(userRef, "journals");
      if (selectedTab == "date" && searchDate) {
        const q = query(
          journalsRef,
          where("date", "==", dayjs(searchDate).format("DD-MM-YYYY")),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs;
      } else if (selectedTab == "mood" && searchMood) {
        const q = query(
          journalsRef,
          where("moodRating", "==", searchMood),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs;
      } else {
        const q = query(journalsRef, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs;
      }
    }
  );
  return (
    <Screen>
      <Window padding={5} paddingBottom={"90px"}>
        <IonContent>
          <Typography variant="h6">Profile</Typography>
          <Box
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            overflow={"auto"}
          >
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
              sx={{ marginY: 2, width: "100%" }}
              label="Journaling Time"
              value={journalTimeDate}
              onAccept={(e) => {
                const dateString = dayjs(e).format("HH:mm").toString();
                localStorage.setItem("journalTime", dateString);
                scheduleNotifications();
              }}
              onChange={(e) => console.log(dayjs(e).format("HH:mm").toString())}
            />

            <Typography variant="h6" marginTop={2}>
              Your Journal history
            </Typography>
            <TabContext value={selectedTab}>
              <TabList
                onChange={(e, v) => setSelectedTab(v)}
                aria-label="lab API tabs example"
                sx={{ marginY: 2 }}
              >
                <Tab label="Search by Date" value="date" />
                <Tab label="Search by Mood" value="mood" />
              </TabList>
              <TabPanel value="date" sx={{ marginY: 2 }}>
                <DatePicker
                  sx={{ marginY: 2, width: "100%" }}
                  value={searchDate}
                  onChange={(e) => setSearchDate(e)}
                  label="Search by Date"
                />
              </TabPanel>
              <TabPanel value="mood" sx={{ marginY: 2 }}>
                <ToggleButtonGroup
                  value={searchMood}
                  exclusive
                  onChange={(e, value) => setSearchMood(value)}
                  aria-label="text alignment"
                >
                  <ToggleButton value={1}>
                    <Typography variant="h4">😔</Typography>
                  </ToggleButton>
                  <ToggleButton value={2}>
                    <Typography variant="h4">😕</Typography>
                  </ToggleButton>
                  <ToggleButton value={3}>
                    <Typography variant="h4">😐</Typography>
                  </ToggleButton>
                  <ToggleButton value={4}>
                    <Typography variant="h4">🙂</Typography>
                  </ToggleButton>
                  <ToggleButton value={5}>
                    <Typography variant="h4">😄</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </TabPanel>
            </TabContext>

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
          </Box>
        </IonContent>
        <BottomTabs tab="profile" />
      </Window>
    </Screen>
  );
};

export default Profile;

import {
  Button,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import dayjs from "dayjs";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getCurrentUser } from "../../utils";

const Questions = () => {
  const userId = getCurrentUser()?.uid;
  const [formData, setFormData] = useState({
    moodRating: null,
    journalData: "",
  });
  const queryClient = useQueryClient();

  const { data: todaysJournal, isLoading: isLoadingTodaysJournal } = useQuery(
    ["todaysJournal", dayjs().format("DD-MM-YYYY")],
    async () => {
      const userRef = doc(db, "users", userId as string);
      const journalsRef = collection(userRef, "journals");
      const q = query(
        journalsRef,
        where("date", "==", dayjs().format("DD-MM-YYYY"))
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs[0].data();
    }
  );

  const {
    data,
    isLoading: isSubmittingJournal,
    mutate: submitJournal,
  } = useMutation({
    mutationKey: ["createJournal"],
    mutationFn: async () => {
      const userRef = doc(db, "users", userId as string);
      const journalsRef = collection(userRef, "journals");

      try {
        const newJournalEntry = {
          moodRating: formData.moodRating,
          journalData: formData.journalData,
          date: dayjs().format("DD-MM-YYYY"),
        };

        await addDoc(journalsRef, newJournalEntry);
        queryClient.invalidateQueries(["all-journals"]);
        queryClient.invalidateQueries(["todaysJournal"]);
        queryClient.setQueryData(
          ["todaysJournal", dayjs().format("DD-MM-YYYY")],
          {
            ...newJournalEntry,
          }
        );
      } catch (error) {
        console.error("Error creating journal entry:", error);
      }
    },
  });

  return (
    <>
      {isLoadingTodaysJournal ? (
        <CircularProgress />
      ) : todaysJournal ? (
        <>
          <Typography variant="h6">Thanks for Journaling today!</Typography>
          <Typography
            variant="body1"
            bgcolor={"Highlight"}
            padding={2}
            border={1}
            borderRadius={2}
            marginY={2}
          >
            {todaysJournal.journalData}
          </Typography>
        </>
      ) : (
        <>
          <Typography marginY={2}>How are you feeling today?</Typography>
          <ToggleButtonGroup
            value={formData.moodRating}
            exclusive
            onChange={(e, value) =>
              setFormData({ ...formData, moodRating: value })
            }
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
          {formData.moodRating && (
            <>
              <TextField
                label="Explain your current mood?"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                sx={{ marginY: 5 }}
                onChange={(e) =>
                  setFormData({ ...formData, journalData: e.target.value })
                }
              />
              {formData.moodRating && formData.journalData.length > 5 && (
                <Button
                  variant="contained"
                  disabled={isSubmittingJournal}
                  onClick={() => submitJournal()}
                >
                  {isSubmittingJournal ? "Submitting..." : "Submit Journal"}
                </Button>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Questions;
